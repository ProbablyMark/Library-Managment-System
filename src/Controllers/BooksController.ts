import { NextFunction, Request, Response } from 'express';
import { BookModel } from '../Models/BooksModel';

const book = new BookModel();

export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await book.create({
      title: req.body.title,
      ISBN: req.body.isbn,
      shelf_location: req.body.shelf_location,
      author: req.body.author
    });
    res.json({ message: 'book created' });
  } catch (error) {
    next(error);
  }
}
export async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await book.updateBook(req.body.book_id, req.body.cols, req.body.values);
    res.json({ message: 'book updated' });
  } catch (error) {
    next(error);
  }
}
export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await book.index());
  } catch (error) {
    next(error);
  }
}

export async function deleteBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await book.deleteBook(Number(req.params.book_id));
    res.json('book deleted');
  } catch (error) {
    next(error);
  }
}
export async function searchBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await book.search(req.body.search_by, req.body.search_term));
  } catch (error) {
    next(error);
  }
}
