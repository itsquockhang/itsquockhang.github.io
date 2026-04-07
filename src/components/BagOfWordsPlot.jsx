import plotlyFactory from 'react-plotly.js/factory'
import Plotly from 'plotly.js-dist-min'
import { PCA } from 'ml-pca'

const createPlotlyComponent = plotlyFactory.default
const Plot = createPlotlyComponent(Plotly)

const words = ['machine', 'learning', 'is', 'fun', 'i', 'like', 'deep', 'part', 'of']
const sentences = [
  'machine learning is fun',
  'i like machine learning',
  'deep learning is part of machine learning',
]

const sentenceVectors = [
  [1, 1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 1, 1, 0, 0, 0],
  [1, 2, 1, 0, 0, 0, 1, 1, 1],
]

const traces = [
  {
    type: 'bar',
    name: 'Sentence 1',
    x: words,
    y: sentenceVectors[0],
    marker: { color: '#1f5ca9' },
  },
  {
    type: 'bar',
    name: 'Sentence 2',
    x: words,
    y: sentenceVectors[1],
    marker: { color: '#00afef' },
  },
  {
    type: 'bar',
    name: 'Sentence 3',
    x: words,
    y: sentenceVectors[2],
    marker: { color: '#0f172a' },
  },
]

const pca = new PCA(sentenceVectors, { center: true, scale: false })
const projectedSentences = pca.predict(sentenceVectors, { nComponents: 2 }).to2DArray()

const projectionTrace = {
  type: 'scatter',
  mode: 'markers+text',
  x: projectedSentences.map(([x]) => x),
  y: projectedSentences.map(([, y]) => y),
  text: ['Sentence 1', 'Sentence 2', 'Sentence 3'],
  customdata: sentences,
  textposition: 'top center',
  marker: {
    size: 8,
    color: ['#1f5ca9', '#00afef', '#0f172a'],
    line: { width: 1, color: '#ffffff' },
  },
  hovertemplate:
    '<b>%{customdata}</b><br>PC1: %{x:.3f}<br>PC2: %{y:.3f}<extra></extra>',
}


const projectionLayout = {
  autosize: true,
  margin: { l: 45, r: 24, t: 24, b: 55 },
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  font: { family: 'K2D, sans-serif', color: '#334155' },
  showlegend: false,
  xaxis: {
    title: 'PC1',
    zeroline: true,
    gridcolor: '#cbd5e1',
    automargin: true,
  },
  yaxis: {
    title: 'PC2',
    zeroline: true,
    gridcolor: '#cbd5e1',
    automargin: true,
  },
}

function BagOfWordsPlot() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="space-y-2">
        <h3 className="font-display text-xl font-semibold text-slate-900">Bag of Words visualizations</h3>
        <p className="text-sm leading-relaxed text-slate-600">
          The same Bag of Words example, shown first as a count view and then as a projected sentence space.
        </p>
      </div>

      <div className="mt-4 h-96 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 md:h-104">
        <Plot
          data={traces}
          layout={{
            autosize: true,
            barmode: 'group',
            margin: { l: 40, r: 24, t: 24, b: 90 },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'K2D, sans-serif', color: '#334155' },
            xaxis: {
              title: 'Vocabulary words',
              tickangle: -30,
              automargin: true,
            },
            yaxis: {
              title: 'Count',
              rangemode: 'tozero',
              automargin: true,
            },
            legend: { orientation: 'h', y: 1.12, x: 0 },
          }}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler
        />
      </div>

      <div className="mt-6 space-y-2">
        <h4 className="font-display text-lg font-semibold text-slate-900">2D projection of sentence vectors</h4>
        <p className="text-sm leading-relaxed text-slate-600">
          Each sentence is projected from the 9D BoW space into 2D with PCA, so you can see how similar sentences cluster.
        </p>
      </div>

      <div className="mt-4 h-96 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 md:h-104">
        <Plot
          data={[projectionTrace]}
          layout={projectionLayout}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler
        />
      </div>
    </section>
  )
}

export default BagOfWordsPlot