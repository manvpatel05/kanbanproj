import pg from 'pg';

const db = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

try {
    db.connect();
    console.log('Connected to PostgreSQL database on port ' + process.env.DB_PORT);
} catch (err) {
    console.error(err);
}

export default db;