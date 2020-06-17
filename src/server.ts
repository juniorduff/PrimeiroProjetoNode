import express, { json } from 'express';
// @ts-ignore
import routes from './routes';
import './database';
import 'reflect-metadata';

const app = express();
app.use(json());
app.use(routes);

app.listen(3000, () => {
  console.log('listening on http://localhost:3000');
});
