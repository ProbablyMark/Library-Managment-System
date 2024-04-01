import { NextFunction, Request, Response } from 'express';
import { BorrowingRecordModel } from '../Models/BorrowingRecordsModel';

import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

const borrowingRecord = new BorrowingRecordModel();

export async function createBorrowingRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await borrowingRecord.create({
      book_id: req.body.book_id,
      borrower_id: req.body.borrower_id
    });
    res.json({ message: 'Borrowing record created' });
  } catch (error) {
    next(error);
  }
}
export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await borrowingRecord.index());
  } catch (error) {
    next(error);
  }
}

export async function returnBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await borrowingRecord.returnBook(+req.params.record_id);
    res.json({ message: result });
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

export async function exportOverdueBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const overdueBooks = await borrowingRecord.getOverdueBooks();

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(overdueBooks);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Overdue Books');

    // Generate a unique filename (e.g., timestamp-based)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `overdue_books_${timestamp}.xlsx`;

    // Save the workbook to a file
    const outputPath = path.join(__dirname, filename); // Choose your desired output directory
    XLSX.writeFile(workbook, outputPath);

    res.download(outputPath, filename, err => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Clean up: Delete the temporary file
        fs.unlinkSync(outputPath);
      }
    });
  } catch (error) {
    next(error);
  }
}
