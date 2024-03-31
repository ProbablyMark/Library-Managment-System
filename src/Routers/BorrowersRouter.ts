import express from 'express';

import {
  createBorrower,
  index,
  deleteBorrower,
  updateBorrower,
  searchBorrower
} from '../Controllers/BorrowersController';

const BorrowersRouter = express.Router();

BorrowersRouter.post('/borrowers/newborrower', createBorrower);
BorrowersRouter.post('/borrowers/search', searchBorrower);
BorrowersRouter.get('/borrowers/all', index);
BorrowersRouter.delete('/borrowers/:borrower_id', deleteBorrower);
BorrowersRouter.patch('/borrowers/:borrower_id', updateBorrower);

export default BorrowersRouter;
