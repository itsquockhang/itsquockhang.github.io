# Bag of Words: a simple but powerful NLP baseline

Bag of Words, often abbreviated as **BoW**, is one of the most fundamental text representations in natural language processing. The core idea is simple: instead of preserving the full sentence structure, we only care about **which words appear** and **how often they appear**.

That may sound naive, but for tasks such as text classification, spam filtering, and document clustering, BoW is still a very strong baseline.

## Intuition

Consider these two sentences:

> I like studying machine learning.

> Studying machine learning is fun.

With Bag of Words, we no longer care about the exact word order. Instead, we build a shared vocabulary and count how many times each word appears in a sentence.

The result is a numeric vector. If the vocabulary has $|V| = 5$ words, then each sentence becomes a 5-dimensional vector.

## How it works

The standard pipeline usually has four steps:

- Tokenize the text.
- Build a vocabulary from the dataset.
- Convert each document into a count vector.
- Feed the vector into a machine learning model.

For example, with these three short sentences:

```text
machine learning is fun
i like machine learning
deep learning is part of machine learning
```

the vocabulary could be:

```text
[machine, learning, is, fun, i, like, deep, part, of]
```

Then sentence 2 might become:

```text
[1, 1, 0, 0, 1, 1, 0, 0, 0]
```

In general, if we denote the vocabulary words as $w_1, w_2, \dots, w_{|V|}$, then the Bag of Words vector for a document $d$ is:

$$
\mathbf{x}(d) = [\text{count}(w_1, d), \text{count}(w_2, d), \dots, \text{count}(w_{|V|}, d)]
$$

Sometimes people also use a binary version of BoW, where each entry is just $0$ or $1$ depending on whether the word appears at least once.

## A simple count table

| Word | Sentence 1 | Sentence 2 | Sentence 3 |
| --- | ---: | ---: | ---: |
| machine | 1 | 1 | 1 |
| learning | 1 | 1 | 2 |
| is | 1 | 0 | 1 |
| fun | 1 | 0 | 0 |
| i | 0 | 1 | 0 |

This table shows the main tradeoff: BoW ignores order, but keeps useful frequency information. That is why it still works well with linear models such as Logistic Regression, Naive Bayes, or SVM.

## Why it works

BoW works surprisingly well because many text tasks are driven by keyword frequency rather than deep sentence structure. If the words "spam", "free", or "urgent" appear often, that signal may already be enough for a classifier.

It is also easy to interpret. You can inspect the vocabulary and see exactly what the model is counting.

## Advantages

- Easy to understand and implement.
- Fast and lightweight.
- Good as a baseline for many text classification tasks.
- Easy to combine with TF-IDF for stronger performance.

## Limitations

- It loses word order.
- It does not capture deep semantic meaning.
- The vectors can become very sparse when the vocabulary is large.
- It struggles with synonyms and different phrasings.

## When to use it

BoW is a good choice when you want a simple, explainable representation and need a quick baseline. If your dataset is small or the task is mostly driven by keyword frequency, it is often a practical starting point.

In modern systems, BoW is rarely the final solution, but it remains an important foundation for understanding how machines see text.

## Quick summary

Bag of Words turns text into a word-count vector. It is simple, effective, and still worth mastering before moving on to TF-IDF, word embeddings, or transformers.

> If you want, the next post can be about TF-IDF or cosine similarity.