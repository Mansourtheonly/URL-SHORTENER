import 'dotenv/config';
import knex, { onDatabaseConnect } from './config/knex';
import httpError from 'http-errors';

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log('Connected to the database successfully!');


  } catch (e) {
    console.log(e);
  }
};

main();
