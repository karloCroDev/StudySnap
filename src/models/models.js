import { v4 as uuidv4 } from 'uuid'; 
import { pool } from '../app/api/database/pool.js';

export class User {
    constructor(username, full_name, email, password, date_created = new Date(), validated = false, profile_picture = null, id = uuidv4()) {
        this.id = id;
        this.username = username;
        this.full_name = full_name;
        this.email = email;
        this.password = password;
        this.date_created = date_created;
        this.validated = validated;
        this.profile_picture = profile_picture;
    }

    async Insert() {
        try {
            await pool.execute(`
                INSERT INTO user (id, username, full_name, email, password, date_created, validated, profile_picture)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `, [this.id, this.username, this.full_name, this.email, this.password, this.date_created, this.validated, this.profile_picture]);
        } catch (err) {
            console.error('Error inserting user:', err);
        }
    }

    async Update() {
        try {
            await pool.execute(`
                UPDATE user
                SET username = ?, full_name = ?, email = ?, password = ?, date_created = ?, validated = ?, profile_picture = ?
                WHERE id = ?;
            `, [this.username, this.full_name, this.email, this.password, this.date_created, this.validated, this.profile_picture, this.id]);
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

export class Subject {
    constructor(name, details, creator, id = uuidv4()) {
        this.id = id;
        this.name = name;
        this.details = details;
        this.creator = creator;
    }

    async Insert() {
        try {
            await pool.execute(`
                INSERT INTO subject (id, name, details, creator)
                VALUES (?, ?, ?, ?);
            `, [this.id, this.name, this.details, this.creator]);
        } catch (err) {
            console.error('Error inserting subject:', err);
        }
    }

    async Update() {
        try {
            await pool.execute(`
                UPDATE subject
                SET name = ?, details = ?, creator = ?
                WHERE id = ?;
            `, [this.name, this.details, this.creator, this.id]);
        } catch (err) {
            console.error('Error updating subject:', err);
        }
    }

    async Delete() {
        try {
            await pool.execute(`
                DELETE FROM subject WHERE id = ?;
            `, [this.id]);
        } catch (err) {
            console.error('Error deleting subject:', err);
        }
    }
}

export class Section {
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
                INSERT INTO section (id, title, details, is_public, subject_id)
                VALUES (?, ?, ?, ?, ?);
            `, [this.id, this.title, this.details, this.is_public, this.subject_id]);
        } catch (err) {
            console.error('Error inserting section:', err);
        }
    }

    async Update() {
        try {
            await pool.execute(`
                UPDATE section
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
                DELETE FROM section WHERE id = ?;
            `, [this.id]);
        } catch (err) {
            console.error('Error deleting section:', err);
        }
    }
}

export class Note {
    constructor(title, content, section_id, id = uuidv4()) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.section_id = section_id;
    }

    async Insert() {
        try {
            await pool.execute(`
                INSERT INTO note (id, title, content, section_id)
                VALUES (?, ?, ?, ?);
            `, [this.id, this.title, this.content, this.section_id]);
        } catch (err) {
            console.error('Error inserting note:', err);
        }
    }

    async Update() {
        try {
            await pool.execute(`
                UPDATE note
                SET title = ?, content = ?, section_id = ?
                WHERE id = ?;
            `, [this.title, this.content, this.section_id, this.id]);
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