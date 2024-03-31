export type BorrowingRecord = {
  record_id?: number;
  book_id: number;
  borrower_id: number;
  checkout_date: Date;
  due_date: Date;
  returned_date?: Date | null;
};
