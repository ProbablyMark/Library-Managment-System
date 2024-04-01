import express from 'express';

import {
  createBorrower,
  index,
  deleteBorrower,
  updateBorrower,
  searchBorrower
} from '../Controllers/BorrowersController';
import { rateLimiter } from '../Middlewares/rateLimiter';

const BorrowersRouter = express.Router();

BorrowersRouter.post('/borrowers/newborrower', rateLimiter, createBorrower);
BorrowersRouter.post('/borrowers/search', searchBorrower);
BorrowersRouter.get('/borrowers/all', index);
BorrowersRouter.delete('/borrowers/:borrower_id', deleteBorrower);
BorrowersRouter.patch('/borrowers/update', updateBorrower);

export default BorrowersRouter;
