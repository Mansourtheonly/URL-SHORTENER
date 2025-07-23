import 'dotenv/config';
import knex, { onDatabaseConnect } from './config/knex';
import httpError from 'http-errors';

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log('Connected to the database successfully!');

const user = await register({username: 'testuser', password: 'password123'})
console.log(user);
  } catch (e) {
    console.log(e);
  }
};

main();
