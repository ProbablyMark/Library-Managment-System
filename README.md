# Library-Managment-System 

- a backend providing end points for interactions with a library client

# Technologies

- Postgres for the database
- Node/Express for the application logic
- db-migrate from npm for migrations


# to install and run (and other useful scripts)

- Install: `npm install`
- create database: `db-migrate up`
- Build: `npm run tsc`
- Lint: `npm run lint`
- Prettify: `npm run prettier`
- Start server with loging: `npm run start-dev`
- Build and start server : `npm run start `
- create a env file: `npm run  create-env`

 

-to create the database :

```
CREATE USER <enter user name>;
CREATE DATABASE  db;
 


```

# env variabls 
- note : you can use the script `npm run create-env` to create the env file

```
POSTGRES_HOST=localhost
POSTGRES_DB=db
POSTGRES_USER= #### /// created user
POSTGRES_PASSWORD= ###### /// created password
 
 

```
# Database ERD 
![Capture](https://github.com/ProbablyMark/Library-Managment-System/assets/96624005/f873adc9-ff16-479b-b644-2a5f89153024)


# content

 
books end points :

- `/books/newbook` :a Post request to  create a new book, further data will be needed in the request body as such > {
"title":"test1",
"isbn":"0000000000001",
"shelf_location":"loco",
"author":"auth"
}
- `/books/all` :a Get request to  index all books.
- `/books/update` :a Patch request to update fields in a book , further data will be needed in the request body as such > {
"book_id":1,
"cols":["title"],
"values":["newtest"]
}
- `/books/search` : a post request to search for a book ,further data will be needed in the request body as such >{
  "search_by":"book_id",
  "search_term":1
}
-`/books/:book_id` :a Delete request to delete a book

borrowers end points :

- `/borrowers/newborrower` :a Post request to create a new borrower further data will be needed in the request body as such > {
      "name":"name",
      "email":"email@domain.com"
     
    }

- `/borrowers/all`: a Get request to show all borrowers 

- `/borrowers/update`:a Patch request to update fields in a borrower,further data will be needed in the request body as such >{
"borrower_id":2,
"cols":["name"],
"values":["newtest"]
}
- `/borrowers/search` : a post request to search for a borrower ,further data will be needed in the request body as such >{
  "search_by":"borrower_id",
  "search_term":1
}
- `/borrowers/:borrower_id` :a Delete request to delete a borrower

Borrowing records end points :

- `/borrowingrecords/newrecord`: a post request to create a new record, further data will be needed in the request body as such >{
"book_id":2,
"borrower_id":4
}
- `/borrowingrecords/all`: a Get request to index all records.
- `/borrowingrecords/:record_id/returned`: a Patch request to return a book.
- `borrowingrecords/borrower/:borrower_id`: a Get request to return borrowed books for a borrower
- `/borrowingrecords/overdue`:a Get request to return all overdue books
- `/borrowingrecords/overdue/export`:a Get request to return all overdue books and export it to a spreadsheet 
note: use `/borrowingrecords/overdue/export` on a browser to download the sheet




  
