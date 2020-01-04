import express, { Request, Response } from 'express';
import routes from './routes';
const port = 4000;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.use('/users', routes.user);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
