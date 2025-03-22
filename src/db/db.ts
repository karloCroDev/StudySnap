//External packages
import { createPool } from 'mysql2';

// Object with credentials for connecting to the database
import { databaseConnectionObject } from '../../Secrets'; // Secret file instead of writing 5-6 .env variables extra and then putting the connection object here

let pool: any;
export function getPool() {
  if (!pool) {
    pool = createPool(databaseConnectionObject).promise();
  }
  return pool;
}
