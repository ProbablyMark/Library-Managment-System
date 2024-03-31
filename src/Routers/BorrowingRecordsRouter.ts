import express from 'express';
import {
  createBorrowingRecord,
  updateReturnedDate,
  getBorrowedBooksForBorrower,
  getOverdueBooks
} from '../Controllers/BorrowingRecordsController';

const BorrowingRecordsRouter = express.Router();

BorrowingRecordsRouter.post(
  '/borrowingrecords/newrecord',
  createBorrowingRecord
);
BorrowingRecordsRouter.patch(
  '/borrowingrecords/:record_id/returned',
  updateReturnedDate
);
BorrowingRecordsRouter.get(
  '/borrowingrecords/borrower/:borrower_id',
  getBorrowedBooksForBorrower
);
BorrowingRecordsRouter.get('/borrowingrecords/overdue', getOverdueBooks);

export default BorrowingRecordsRouter;
