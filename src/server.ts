import 'reflect-metadata';
import './database';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const server = express();
server.use(express.json());
server.use(cors());

server.use(routes);

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`🚀 Server is running in port: ${port}\nPress ctrl+c to stop process`);
});
