import { NextFunction, Request, Response } from 'express';
import { BorrowerModel } from '../Models/BorrowersModel';

const borrower = new BorrowerModel();

export async function createBorrower(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await borrower.create({
      name: req.body.name,
      email: req.body.email
    });
    res.json({ message: 'Borrower created' });
  } catch (error) {
    next(error);
  }
}
export async function updateBorrower(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await borrower.updateBorrower(
      req.body.borrower_id,
      req.body.cols,
      req.body.values
    );
    res.json({ message: 'borrower updated' });
  } catch (error) {
    next(error);
  }
}
export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await borrower.index());
  } catch (error) {
    next(error);
  }
}

export async function deleteBorrower(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await borrower.deleteBorrower(Number(req.params.borrower_id));
    res.json('borrower deleted');
  } catch (error) {
    next(error);
  }
}
export async function searchBorrower(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await borrower.search(req.body.search_by, req.body.search_term));
  } catch (error) {
    next(error);
  }
}
