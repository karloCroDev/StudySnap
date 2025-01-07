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

  static async Update( username:string,  email:string, password:string, profile_picture:string, id:string): Promise<void> {
    try {
      await pool.execute(
        `
        UPDATE user
        SET username = ?, email = ?, password = ?, profile_picture = ?
        WHERE id = ?;
      `,
        [username, email, password, profile_picture, id]
      );
    } catch (err) {
      console.error('Error updating user:', err);
    }
  }

  static async Delete(id: string): Promise<void> {
    try {
      await pool.execute(
        `
        DELETE FROM user WHERE id = ?;
      `,
        [id]
      );
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  }
}