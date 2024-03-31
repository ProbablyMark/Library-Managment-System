import client from '../database';
import { BorrowingRecord } from '../Types/BorrowingRecord';

export class BorrowingRecordModel {
  async index(): Promise<BorrowingRecord[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM BorrowingRecords ORDER BY record_id ASC`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get borrowing records: ${error}`);
    }
  }

  async create(record: BorrowingRecord): Promise<BorrowingRecord> {
    try {
      const connection = await client.connect();
      const sql = `
        INSERT INTO BorrowingRecords (book_id, borrower_id )
        VALUES ($1, $2  )
        RETURNING *`;
      const result = await connection.query(sql, [
        record.book_id,
        record.borrower_id
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot add borrowing record: ${error}`);
    }
  }

  async updateReturnedDate(
    recordId: number,
    returnedDate: Date
  ): Promise<BorrowingRecord> {
    try {
      const connection = await client.connect();
      const sql = `
        UPDATE BorrowingRecords
        SET returned_date = $1
        WHERE record_id = $2
        RETURNING *`;
      const result = await connection.query(sql, [returnedDate, recordId]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot update returned date: ${error}`);
    }
  }

  async getBorrowedBooksForBorrower(
    borrowerId: number
  ): Promise<BorrowingRecord[]> {
    try {
      const connection = await client.connect();
      const sql = `
        SELECT *
        FROM BorrowingRecords
        WHERE borrower_id = $1
        AND returned_date IS NULL
        ORDER BY record_id ASC`;
      const result = await connection.query(sql, [borrowerId]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get borrowed books for borrower: ${error}`);
    }
  }

  async getOverdueBooks(): Promise<BorrowingRecord[]> {
    try {
      const connection = await client.connect();
      const sql = `
        SELECT *
        FROM BorrowingRecords
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
