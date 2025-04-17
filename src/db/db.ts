//External packages
import { createPool } from 'mysql2';

// Object with credentials for connecting to the database
const databaseConnectionObject = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.MY_SQL_USER_PASSWORD,
  database: 'studysnap',
};

const databaseConnectionObject2 = {
  host: 'mysql-20aad0cb-studysnapdatabse-674b.f.aivencloud.com',
  port: 15740,
  user: 'avnadmin',
  password: process.env.MY_SQL_ONLINE_PASSWORD,
  database: 'defaultdb',
};


let pool: any;
export function getPool() {
  if (!pool) {
    pool = createPool(databaseConnectionObject2).promise();
  }
  return pool;
}
