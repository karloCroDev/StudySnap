//External packages
import { createPool } from 'mysql2';

// Object with credentials for connecting to the database
import { databaseConnectionObject } from '../../../Secrets';

let pool: any;
export function getPool() {
  if (!pool) {
    pool = createPool(databaseConnectionObject).promise();
  }
  return pool;
}
