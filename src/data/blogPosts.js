import bagOfWordsContent from '../content/blog/bag-of-words.md?raw'
import imageProcessingBasicsContent from '../content/blog/image-processing-basics.md?raw'

export const blogPosts = [
  {
    slug: 'bag-of-words',
    title: 'Bag of Words: a simple but powerful NLP baseline',
    excerpt:
      'A practical note on Bag of Words, with intuition, math, examples, and the main tradeoffs you should know.',
    date: '2026-04-07',
    readingTime: '6 min read',
    tags: ['NLP', 'Text Classification'],
    coverLabel: 'BoW',
    content: bagOfWordsContent,
  },
  {
    slug: 'basic-image-processing',
    title: 'Basic image processing: gradients, Sobel X, and Sobel Y',
    excerpt:
      'A practical introduction to image gradients, edge detection, and how Sobel filters respond to horizontal and vertical changes.',
    date: '2026-04-07',
    readingTime: '7 min read',
    tags: ['Computer Vision', 'Image Processing'],
    coverLabel: 'Sobel',
    content: imageProcessingBasicsContent,
  },
]

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug)
}