import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
const port = 4000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', routes.user);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
