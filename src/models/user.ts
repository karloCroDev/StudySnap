import { v4 as uuidv4 } from 'uuid';
import { pool } from '../database/pool';

//Todo add cascade delete

export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  date_created: Date;
  profile_picture: string | null;

  constructor(
    username: string,
    email: string,
    password: string,
    date_created: Date = new Date(),
    profile_picture: string | null = null,
    id: string = uuidv4()
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.date_created = date_created;
    this.profile_picture = profile_picture;
  }

  async Insert(): Promise<void> {
    try {
      await pool.execute(
        `
        INSERT INTO user (id, username, email, password, date_created, profile_picture)
        VALUES (?, ?, ?, ?, ?, ?);
      `,
        [this.id, this.username, this.email, this.password, this.date_created, this.profile_picture]
      );
    } catch (err) {
      console.error('Error inserting user:', err);
    }
  }

  async Update(): Promise<void> {
    try {
      await pool.execute(
        `
        UPDATE user
        SET username = ?, email = ?, password = ?, date_created = ?, profile_picture = ?
        WHERE id = ?;
      `,
        [this.username, this.email, this.password, this.date_created, this.profile_picture, this.id]
      );
    } catch (err) {
      console.error('Error updating user:', err);
    }
  }

  async Delete(): Promise<void> {
    try {
      await pool.execute(
        `
        DELETE FROM user WHERE id = ?;
      `,
        [this.id]
      );
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  }
}