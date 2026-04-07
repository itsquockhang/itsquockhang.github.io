import { useEffect, useMemo, useState } from 'react'
import plotlyFactory from 'react-plotly.js/factory'
import Plotly from 'plotly.js-dist-min'

const createPlotlyComponent = plotlyFactory.default
const Plot = createPlotlyComponent(Plotly)

const IMAGE_SRC = '/ctu-campus-bg.jpg'
const TARGET_WIDTH = 48

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function createMatrix(height, width, fill = 0) {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => fill))
}

function computeVisualization(image) {
  const width = TARGET_WIDTH
  const height = Math.max(18, Math.round((image.naturalHeight / image.naturalWidth) * width))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) {
    throw new Error('Canvas context is unavailable.')
  }

  context.drawImage(image, 0, 0, width, height)
  const pixels = context.getImageData(0, 0, width, height).data

  const grayscale = createMatrix(height, width)

  for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
      const offset = (row * width + column) * 4
      const red = pixels[offset]
      const green = pixels[offset + 1]
      const blue = pixels[offset + 2]
      grayscale[row][column] = Math.round(0.299 * red + 0.587 * green + 0.114 * blue)
    }
  }

  const sobelXKernel = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ]

  const sobelYKernel = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
  ]

  const sobelX = createMatrix(height, width)
  const sobelY = createMatrix(height, width)
  const gradientMagnitude = createMatrix(height, width)

  const readPixel = (row, column) => grayscale[clamp(row, 0, height - 1)][clamp(column, 0, width - 1)]

  for (let row = 0; row < height; row += 1) {
    for (let column = 0; column < width; column += 1) {
      let gx = 0
      let gy = 0

      for (let kernelRow = 0; kernelRow < 3; kernelRow += 1) {
        for (let kernelColumn = 0; kernelColumn < 3; kernelColumn += 1) {
          const pixel = readPixel(row + kernelRow - 1, column + kernelColumn - 1)
          gx += pixel * sobelXKernel[kernelRow][kernelColumn]
          gy += pixel * sobelYKernel[kernelRow][kernelColumn]
        }
      }

      sobelX[row][column] = gx
      sobelY[row][column] = gy
      gradientMagnitude[row][column] = Math.sqrt(gx * gx + gy * gy)
    }
  }

  const signedMax = Math.max(
    ...sobelX.flat().map((value) => Math.abs(value)),
    ...sobelY.flat().map((value) => Math.abs(value)),
    1,
  )
  const magnitudeMax = Math.max(...gradientMagnitude.flat(), 1)

  return {
    grayscale,
    sobelX,
    sobelY,
    gradientMagnitude,
    signedMax,
    magnitudeMax,
  }
}

function buildLayout() {
  return {
    autosize: true,
    margin: { l: 12, r: 12, t: 12, b: 12 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { family: 'K2D, sans-serif', color: '#334155' },
    xaxis: { visible: false, constrain: 'domain' },
    yaxis: { visible: false, scaleanchor: 'x', scaleratio: 1 },
  }
}

function HeatmapCard({ title, description, z, colorscale, zmin, zmax, zmid }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="space-y-1">
        <h4 className="font-display text-base font-semibold text-slate-900">{title}</h4>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
      <div className="mt-3 h-44 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1 md:h-52">
        <Plot
          data={[
            {
              type: 'heatmap',
              z,
              showscale: false,
              hoverinfo: 'skip',
              colorscale,
              zmin,
              zmax,
              zmid,
            },
          ]}
          layout={buildLayout()}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler
        />
      </div>
    </article>
  )
}

function ImageProcessingPlot() {
  const [visualization, setVisualization] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const image = new Image()
    image.src = IMAGE_SRC
    image.onload = () => {
      if (!isMounted) {
        return
      }

      try {
        setVisualization(computeVisualization(image))
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to process the image.')
      }
    }
    image.onerror = () => {
      if (isMounted) {
        setError('Failed to load the sample image.')
      }
    }

    return () => {
      isMounted = false
    }
  }, [])

  const cards = useMemo(() => {
    if (!visualization) {
      return []
    }

    return [
      {
        title: 'Grayscale image',
        description: 'The real photo after resizing and converting to intensity values.',
        z: visualization.grayscale,
        colorscale: 'Greys',
        zmin: 0,
        zmax: 255,
      },
      {
        title: 'Sobel X',
        description: 'Strong responses appear where the image changes from left to right.',
        z: visualization.sobelX,
        colorscale: 'RdBu',
        zmin: -visualization.signedMax,
        zmax: visualization.signedMax,
        zmid: 0,
      },
      {
        title: 'Sobel Y',
        description: 'Strong responses appear where the image changes from top to bottom.',
        z: visualization.sobelY,
        colorscale: 'RdBu',
        zmin: -visualization.signedMax,
        zmax: visualization.signedMax,
        zmid: 0,
      },
      {
        title: 'Gradient magnitude',
        description: 'This combines both directions and highlights the edge energy.',
        z: visualization.gradientMagnitude,
        colorscale: 'YlOrRd',
        zmin: 0,
        zmax: visualization.magnitudeMax,
      },
    ]
  }, [visualization])

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="space-y-2">
        <h3 className="font-display text-xl font-semibold text-slate-900">Sobel example on a real image</h3>
        <p className="text-sm leading-relaxed text-slate-600">
          This uses the campus background photo from the site assets, then computes grayscale, Sobel X, Sobel Y, and gradient magnitude from it.
        </p>
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {error}
        </div>
      ) : null}

      <figure className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
        <div className="relative aspect-16/6 w-full overflow-hidden bg-slate-100">
          <img
            src={IMAGE_SRC}
            alt="Sample campus scene used for Sobel edge detection"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/70 to-transparent px-4 py-3">
            <p className="text-sm font-semibold text-white">Real image input used for the edge detection example.</p>
          </div>
        </div>
      </figure>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {visualization
          ? cards.map((card) => (
              <HeatmapCard
                key={card.title}
                title={card.title}
                description={card.description}
                z={card.z}
                colorscale={card.colorscale}
                zmin={card.zmin}
                zmax={card.zmax}
                zmid={card.zmid}
              />
            ))
          : Array.from({ length: 4 }, (_, index) => (
              <div
                key={`placeholder-${index}`}
                className="flex h-72 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500"
              >
                Loading visualization...
              </div>
            ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Interpretation</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Sobel X lights up vertical boundaries, while Sobel Y highlights horizontal changes. The gradient magnitude combines both into a single edge map.
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Why it helps</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Seeing the real photo beside the filter outputs makes it easier to connect the math with what the edge detector is actually capturing.
          </p>
        </article>
      </div>
    </section>
  )
}

export default ImageProcessingPlot