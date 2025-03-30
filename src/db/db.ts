//External packages
import { createPool } from 'mysql2';

// Object with credentials for connecting to the database
let databaseConnectionObject = {
  host:"localhost",
  port:3306,
  user:"root",
  password: process.env.MY_SQL_USER_PASSWORD,
  database:"studysnap"
}

let pool: any;
export function getPool() {
  if (!pool) {
    pool = createPool(databaseConnectionObject).promise();
  }
  return pool;
}

