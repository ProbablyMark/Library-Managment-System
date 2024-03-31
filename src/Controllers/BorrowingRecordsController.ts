import { NextFunction, Request, Response } from 'express';
import { BorrowingRecordModel } from '../Models/BorrowingRecordsModel';

const borrowingRecord = new BorrowingRecordModel();

export async function createBorrowingRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await borrowingRecord.create({
      book_id: req.body.book_id,
      borrower_id: req.body.borrower_id,
      checkout_date: new Date(), // Set the checkout date
      due_date: req.body.due_date
    });
    res.json({ message: 'Borrowing record created' });
  } catch (error) {
    next(error);
  }
}

export async function updateReturnedDate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await borrowingRecord.updateReturnedDate(
      +req.params.record_id,
      new Date() // Set the returned date
    );
    res.json({ message: 'Returned date updated' });
  } catch (error) {
    next(error);
  }
}

export async function getBorrowedBooksForBorrower(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const borrowerId = +req.params.borrower_id;
    res.json(await borrowingRecord.getBorrowedBooksForBorrower(borrowerId));
  } catch (error) {
    next(error);
  }
}

export async function getOverdueBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await borrowingRecord.getOverdueBooks());
  } catch (error) {
    next(error);
  }
}
