import { v4 as uuidv4 } from 'uuid'; 
import { pool } from '../app/api/database/pool.ts';

export class User {
    constructor(username, email, password, date_created = new Date(), profile_picture = null, id = uuidv4()) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.date_created = date_created;
        this.profile_picture = profile_picture;
    }

    async Insert() {
        try {
            await pool.execute(`
                INSERT INTO user (id, username, email, password, date_created, profile_picture)
                VALUES (?, ?, ?, ?, ?, ?);
            `, [this.id, this.username, this.email, this.password, this.date_created, this.profile_picture]);
        } catch (err) {
            console.error('Error inserting user:', err);
        }
    }

    async Update() {
        try {
            await pool.execute(`
                UPDATE user
                SET username = ?, email = ?, password = ?, date_created = ?, profile_picture = ?
                WHERE id = ?;
            `, [this.username, this.email, this.password, this.date_created, this.profile_picture, this.id]);
        } catch (err) {
            console.error('Error updating user:', err);
        }
    }

    async Delete() {
        try {
            await pool.execute(`
                DELETE FROM user WHERE id = ?;
            `, [this.id]);
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    }
}

export class Subject { //Todo add image to subject
    constructor(name, details, creator, image, id = uuidv4()) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.creator = creator;
        this.image = image;
    }

    async Insert() {
        try {
            await pool.execute(`
                INSERT INTO subject (id, name, details, creator, image)
                VALUES (?, ?, ?, ?, ?);
            `, [this.id, this.name, this.details, this.creator, this.image]);
        } catch (err) {
            console.error('Error inserting subject:', err);
        }
    }

    static async Update(id, name, details) {
        try {
            await pool.execute(`
                UPDATE subject
                SET name = ?, details = ?
                WHERE id = ?;
            `, [name, details, id]);
        } catch (err) {
            console.error('Error updating subject:', err);
        }
    }

    static async Delete(id) {
        try {
            await pool.execute(`
                DELETE FROM subject WHERE id = ?;
            `, [id]);
        } catch (err) {
            console.error('Error deleting subject:', err);
        }
    }
}


export class Note {
    constructor(title, details, is_public, subject_id, id = uuidv4()) {
        this.id = id;
        this.title = title;
        this.details = details;
        this.is_public = is_public;
        this.subject_id = subject_id;
    }

    async Insert() {
        try {
            await pool.execute(`
                INSERT INTO note (id, title, details, is_public, subject_id)
                VALUES (?, ?, ?, ?, ?);
            `, [this.id, this.title, this.details, this.is_public, this.subject_id]);
        } catch (err) {
            console.error('Error inserting section:', err);
        }
    }

    async Update() {
        try {
            await pool.execute(`
                UPDATE note
                SET title = ?, details = ?, is_public = ?, subject_id = ?
                WHERE id = ?;
            `, [this.title, this.details, this.is_public, this.subject_id, this.id]);
        } catch (err) {
            console.error('Error updating section:', err);
        }
    }

    async Delete() {
        try {
            await pool.execute(`
                DELETE FROM note WHERE id = ?;
            `, [this.id]);
        } catch (err) {
            console.error('Error deleting section:', err);
        }
    }
}

export class Document {
    constructor(title, content, note_id, id = uuidv4()) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.note_id = note_id;
    }

    async Insert() {
        try {
            await pool.execute(`
                INSERT INTO note (id, title, content, note_id)
                VALUES (?, ?, ?, ?);
            `, [this.id, this.title, this.content, this.note_id]);
        } catch (err) {
            console.error('Error inserting note:', err);
        }
    }

    async Update() {
        try {
            await pool.execute(`
                UPDATE note
                SET title = ?, content = ?, note_id = ?
                WHERE id = ?;
            `, [this.title, this.content, this.note_id, this.id]);
        } catch (err) {
            console.error('Error updating note:', err);
        }
    }

    async Delete() {
        try {
            await pool.execute(`
                DELETE FROM note WHERE id = ?;
            `, [this.id]);
        } catch (err) {
            console.error('Error deleting note:', err);
        }
    }
}

export class Saves {
    constructor(user_id, subject_id) {
        this.id = user_id + subject_id;
        this.user_id = user_id;
        this.subject_id = subject_id;
    }

    async Insert() {
        try {
            await pool.execute(`
                INSERT INTO saves (id, user_id, subject_id)
                VALUES (?, ?, ?);
            `, [this.id, this.user_id, this.subject_id]);
        } catch (err) {
            console.error('Error inserting save:', err);
        }
    }

    async Delete() {
        try {
            await pool.execute(`
                DELETE FROM saves WHERE id = ?;
            `, [this.id]);
        } catch (err) {
            console.error('Error deleting save:', err);
        }
    }
}

export class Likes {
    constructor(user_id, subject_id) {
        this.id = user_id + subject_id;
        this.user_id = user_id;
        this.subject_id = subject_id;
    }

    async Insert() {
        try {
            await pool.execute(`
                INSERT INTO likes (id, user_id, subject_id)
                VALUES (?, ?, ?);
            `, [this.id, this.user_id, this.subject_id]);
        } catch (err) {
            console.error('Error inserting like:', err);
        }
    }

    async Delete() {
        try {
            await pool.execute(`
                DELETE FROM likes WHERE id = ?;
            `, [this.id]);
        } catch (err) {
            console.error('Error deleting like:', err);
        }
    }
}