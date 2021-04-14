import { createConnection } from 'typeorm';

createConnection().then(() => console.log('📦 Success to connect at database'));
