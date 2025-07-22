import knexLib from 'knex';
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const db = knexLib({
  client: 'postgresql',
  connection: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
  },
});

export const onDatabaseConnect = async () => db.raw("SELECT 1");
export default db;
