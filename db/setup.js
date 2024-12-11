async function createTables(pool) {
    try {


        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        const createPostsTable = `
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                body TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        await pool.query(createUsersTable);
        console.log('Users table created.');

        await pool.query(createPostsTable);
        console.log('Posts table created.');    
    } catch (error) {
        console.error('Error creating tables:', error.message);
    }
}

module.exports = createTables;