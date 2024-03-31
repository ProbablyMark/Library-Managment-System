import express from 'express';

import {
  createBook,
  index,
  deleteBook,
  updateBook,
  searchBook
} from '../Controllers/BooksController';

const BooksRouter = express.Router();

BooksRouter.post('/books/newbook', createBook);
BooksRouter.post('/books/search', searchBook);
BooksRouter.get('/books/all', index);
BooksRouter.delete('/books/:book_id', deleteBook);
BooksRouter.patch('/books/:book_id', updateBook);

export default BooksRouter;
