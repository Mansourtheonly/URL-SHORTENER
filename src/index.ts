import 'dotenv/config';
import knex, { onDatabaseConnect } from './config/knex';
import httpError from 'http-errors';

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log('Connected to the database successfully!');

    // Insert a new user and return all columns ("*")
      const users = await knex("users").where("id", 1).select("*");
console.log(users[0].password);
  } catch (e) {
    console.log(e);
  }
};

main();
