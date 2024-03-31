CREATE TABLE IF NOT EXISTS public."books"
(
    book_id  serial NOT NULL,
    title character varying(225) COLLATE pg_catalog."default",  
      author character varying(225) COLLATE pg_catalog."default",
    quantity integer DEFAULT 0,
    shelf_location character varying(225) COLLATE pg_catalog."default",
    isbn integer DEFAULT 0,
    CONSTRAINT "books_pkey" PRIMARY KEY (book_id)
);

 CREATE TABLE IF NOT EXISTS public."borrowers"
(
    borrower_id  serial NOT NULL,
    name character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    registered_date date DEFAULT  now(),
    CONSTRAINT "borrowers_pkey" PRIMARY KEY (borrower_id)
);
 CREATE TABLE IF NOT EXISTS public."borrowing_records"
(
    record_id  serial NOT NULL,
    book_id integer ,
    borrower_id integer ,
    checkout_date date DEFAULT  now(),
    due_date date DEFAULT (CURRENT_DATE + '7 days'::interval),
    returned_date date,
    CONSTRAINT "borrowing_records_pkey" PRIMARY KEY (record_id),
    CONSTRAINT book_id FOREIGN KEY (book_id)
        REFERENCES public."books" (book_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT borrower_id FOREIGN KEY (borrower_id)
        REFERENCES public."borrowers" (borrower_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
