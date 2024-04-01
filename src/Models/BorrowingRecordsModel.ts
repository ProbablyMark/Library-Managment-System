import client from '../database';
import { Book } from '../Types/Book';
import { BorrowingRecord } from '../Types/BorrowingRecord';

export class BorrowingRecordModel {
  async index(): Promise<BorrowingRecord[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM borrowing_records ORDER BY record_id ASC`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get borrowing records: ${error}`);
    }
  }

  async create(record: BorrowingRecord): Promise<BorrowingRecord | Book[]> {
    try {
      const connection = await client.connect();
      const sql = `
        WITH inserted_record AS (
          INSERT INTO borrowing_records (book_id, borrower_id)
          VALUES ($1, $2)
          RETURNING *
        )
        UPDATE books
        SET quantity = quantity - 1
        FROM inserted_record
        WHERE books.book_id = inserted_record.book_id
        AND books.quantity > 0
        RETURNING inserted_record.*, books.quantity AS updated_quantity;
      `;

      const result = await connection.query(sql, [
        record.book_id,
        record.borrower_id
      ]);
      connection.release();

      if (result.rows.length === 0) {
        throw new Error('Book quantity is insufficient.');
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot add borrowing record: ${error}`);
    }
  }

  async returnBook(recordId: number): Promise<BorrowingRecord | string> {
    try {
      const connection = await client.connect();

      // 1. Check for returned date
      const sql = `
        SELECT returned_date
        FROM borrowing_records
        WHERE record_id = $1;
      `;
      const checkResult = await connection.query(sql, [recordId]);

      if (checkResult.rows[0]?.returned_date) {
        connection.release();
        return 'Book already returned.';
      }

      // 2. Update borrowing record (if not returned)
      const updateBorrowingSql = `
        UPDATE borrowing_records
        SET returned_date = now()
        WHERE record_id = $1;
      `;
      await connection.query(updateBorrowingSql, [recordId]);

      // 3. Update book quantity (if borrowing record updated)
      const updateBookSql = `
        UPDATE books
        SET quantity = quantity + 1
        FROM borrowing_records AS br
        WHERE books.book_id = br.book_id
          AND br.record_id = $1;
      `;
      await connection.query(updateBookSql, [recordId]);

      connection.release();
      return 'Book returned.';
    } catch (error) {
      throw new Error(`Cannot update returned date: ${error}`);
    }
  }

  async getBorrowedBooksForBorrower(
    borrowerId: number
  ): Promise<{ record: BorrowingRecord; book: Book }[]> {
    try {
      const connection = await client.connect();

      // 1. Get borrowing records
      const sql = `
      SELECT DISTINCT br.*, b.book_id, b.title, b.author
      FROM borrowing_records AS br
      INNER JOIN books AS b ON br.book_id = b.book_id
      WHERE borrower_id = $1
      AND br.returned_date IS NULL
      ORDER BY record_id ASC;
      
      `;
      const result = await connection.query(sql, [borrowerId]);
      connection.release();

      // 2. Convert to desired object structure
      const borrowedBooks: { record: BorrowingRecord; book: Book }[] = [];
      for (const row of result.rows) {
        borrowedBooks.push({
          ...row // Include all borrowing record and book properties
        });
      }

      return borrowedBooks;
    } catch (error) {
      throw new Error(`Cannot get borrowed books for borrower: ${error}`);
    }
  }

  async getOverdueBooks(): Promise<BorrowingRecord[]> {
    try {
      const connection = await client.connect();
      const sql = `
        SELECT *
        FROM borrowing_records
        WHERE due_date < NOW()
        AND returned_date IS NULL
        ORDER BY record_id ASC`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get overdue books: ${error}`);
    }
  }
}
