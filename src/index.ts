import 'dotenv/config';
import knex, { onDatabaseConnect } from './config/knex';
import httpError from 'http-errors';

const main = async () => {
  try {
    await onDatabaseConnect();
    console.log('Connected to the database successfully!');

const user = await login({username: "course", password : "123456"})
console.log(await validateJWT(resourceLimits.token));

  } catch (e) {
    console.log(e);
  }
};

main();
