import client from '../database';
import { Book } from '../Types/Book';

let sql: string = ``;
//creating update query dynamically
function creatQuery(cols: string[]) {
  const query = ['UPDATE Books'];
  query.push('SET');

  const set: string[] = [];
  Object.values(cols).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 2) + ')');
  });
  query.push(set.join(', '));

  query.push('WHERE Book_id = ($1) ');

  sql = query.join(' ');
}
//
export class BookModel {
  async index(): Promise<Book[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM Books ORDER BY Book_id asc`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get Books ${error}`);
    }
  }

  async create(book: Book): Promise<Book> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO Books ( 
        title,
        isbn,
        shelf_location,
      author,
        quantity) VALUES ($1,$2,$3,$4,0) returning *`;
      const result = await connection.query(sql, [
        book.title,
        book.ISBN,
        book.shelf_location,
        book.author
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot add Book  ${error}`);
    }
  }
  async deleteBook(id: number): Promise<Book> {
    try {
      const connection = await client.connect();
      const sql = `DELETE FROM Books WHERE Book_id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get Book ${error}`);
    }
  }
  async updateBook(
    id: number,
    cols: string[],
    values: string[]
  ): Promise<Book> {
    try {
      creatQuery(cols);
      const connection = await client.connect();

      const result = await connection.query(sql, [id, ...values]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get Book ${error}`);
    }
  }
  async search(column: string, search_term: string): Promise<Book[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM Books WHERE ${column} = $1`;
      const result = await connection.query(sql, [search_term]);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot search Books: ${error}`);
    }
  }
}
