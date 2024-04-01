import express from 'express';
import {
  createBorrowingRecord,
  returnBook,
  getBorrowedBooksForBorrower,
  getOverdueBooks,
  exportOverdueBooks,
  index
} from '../Controllers/BorrowingRecordsController';
import { rateLimiter } from '../Middlewares/rateLimiter';

const BorrowingRecordsRouter = express.Router();

BorrowingRecordsRouter.post(
  '/borrowingrecords/newrecord',
  rateLimiter /*api rate limiter*/,
  createBorrowingRecord
);
BorrowingRecordsRouter.patch(
  '/borrowingrecords/:record_id/returned',
  returnBook
);
BorrowingRecordsRouter.get(
  '/borrowingrecords/borrower/:borrower_id',
  getBorrowedBooksForBorrower
);
BorrowingRecordsRouter.get('/borrowingrecords/all', index);
BorrowingRecordsRouter.get('/borrowingrecords/overdue', getOverdueBooks);
BorrowingRecordsRouter.get(
  '/borrowingrecords/overdue/export',
  exportOverdueBooks
);

export default BorrowingRecordsRouter;
