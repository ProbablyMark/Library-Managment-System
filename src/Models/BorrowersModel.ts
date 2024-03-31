import client from '../database';
import { Borrower } from '../Types/Borrower';

let sql: string = ``;

//creating update query dynamically
function creatQuery(cols: string[]) {
  const query = ['UPDATE Borrowers'];
  query.push('SET');

  const set: string[] = [];
  Object.values(cols).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 2) + ')');
  });
  query.push(set.join(', '));

  query.push('WHERE Borrower_id = ($1) ');

  sql = query.join(' ');
}
///
export class BorrowerModel {
  async index(): Promise<Borrower[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM Borrowers ORDER BY Borrower_id asc`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get Borrowers ${error}`);
    }
  }

  async create(Borrower: Borrower): Promise<Borrower> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO Borrowers ( 
        name,
        email,
        phone,
        ) VALUES ($1,$2,$3) returning *`;
      const result = await connection.query(sql, [
        Borrower.name,
        Borrower.email,
        Borrower.registered_date
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot add Borrower  ${error}`);
    }
  }
  async deleteBorrower(id: number): Promise<Borrower> {
    try {
      const connection = await client.connect();
      const sql = `DELETE FROM Borrowers WHERE Borrower_id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get Borrower ${error}`);
    }
  }
  async updateBorrower(
    id: number,
    cols: string[],
    values: string[]
  ): Promise<Borrower> {
    try {
      creatQuery(cols);
      const connection = await client.connect();

      const result = await connection.query(sql, [id, ...values]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get Borrower ${error}`);
    }
  }
  async search(column: string, search_term: string): Promise<Borrower[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM Borrowers WHERE ${column} ILIKE $1`;
      const result = await connection.query(sql, [`%${search_term}%`]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot search Borrowers: ${error}`);
    }
  }
}
