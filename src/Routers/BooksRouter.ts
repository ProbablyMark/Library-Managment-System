import express from 'express';

import {
  createBook,
  index,
  deleteBook,
  updateBook,
  searchBook
} from '../Controllers/BooksController';
import { rateLimiter } from '../Middlewares/rateLimiter';

const BooksRouter = express.Router();

BooksRouter.post('/books/newbook', rateLimiter, createBook);
BooksRouter.post('/books/search', searchBook);
BooksRouter.get('/books/all', index);
BooksRouter.delete('/books/:book_id', deleteBook);
BooksRouter.patch('/books/update', updateBook);

export default BooksRouter;
