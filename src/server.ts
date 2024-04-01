import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { errorMiddleWare } from './Middlewares/errorMiddleware';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import BorrowersRouter from './Routers/BorrowersRouter';
import BooksRouter from './Routers/BooksRouter';
import BorrowingRecordsRouter from './Routers/BorrowingRecordsRouter';

const app: express.Application = express();
const address: string = 'localhost:3000';
const port: number = 3000;

//use morgan

app.use(morgan(':method :url  :status :http-version :response-time '));

//use cors
app.use(cors());
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//

http.createServer(app).listen(port, async () => {
  try {
    console.log(`server running on ${address}  `);
  } catch (error) {
    console.log(error);
  }
});

//routers

app.use(BooksRouter);
app.use(BorrowersRouter);
app.use(BorrowingRecordsRouter);

//Not found MW
app.use((req: Request, res: Response) => {
  res.status(404).send('not found');
});
//error MW
app.use(errorMiddleWare);
export default app;
