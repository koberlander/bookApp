const Joi = require('joi');
const express = require('express');
const app = express()

app.use(express.json())

const books = [
   {
      'id':  1,
      'genre': 'book genre 1',
      'title': 'book title 1',
      'description': 'description 1'
   },
   {
      'id':  2,
      'genre': 'book genre 2',
      'title': 'book title 2',
      'description': 'description 2'
   },
   {
      'id':  3,
      'genre': 'book genre 3',
      'title': 'book title 3',
      'description': 'description 3'
   }
]

app.get('/', (req, res) => {
  res.send(books)
})

app.get('/api/books', (req, res) => {
  res.send(books)
})

app.post('/api/books', (req, res) => {
  // Validate
  const {error} = validateBook(req.body)

  // If invalid, return 400 - Bad request
  if(error){
    res.status(400).send(error.details[0].message)
    return
  }

  const book = {
    id: bokks.length + 1,
    genre: req.body.genre,
    title: req.body.title,
    description: req.body.description
  }
  books.push(book)
  res.send(book)
})

app.put('/api/books/:id', (req, res) => {
  // Find the book. If no book, return 404.
  const book = books.find(b => b.id === req.params.id)

  if (!book) res.status(404).send('Book with that ID not found.')

  // Validate
  const {error} = validateBook(req.body)

  // If invalid, return 400 - Bad request
  if(error){
    res.status(400).send(error.details[0].message)
    return
  }

  // Update the book
  book.genre = req.body.genre
  book.title = req.body.title
  book.description = req.body.description

  // Return the updated book
  res.send(book)
})

function validateBook(book) {
  // Validate
  const schema = {
    genre: Joi.string().min(3),
    title: Joi.string().min(3),
    description: Joi.string().min(3)
  }

  return Joi.validate(book, schema)
}

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id)

  if (!book) res.status(404).send('Book with that ID not found.')

  res.send(book)
})

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
