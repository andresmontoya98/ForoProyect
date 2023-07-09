require('dotenv').config();

const { getConnection } = require('./db');

//Creación la base de datos
async function main() {
  let connection;

  try {
    connection = await getConnection();

    console.log('Iniciando Base de datos');

    await connection.query('DROP DATABASE IF EXISTS enlaces');

    await connection.query('CREATE DATABASE enlaces');

    await connection.query('USE enlaces');

    console.log('Creando las tablas de la base de datos');

    await connection.query(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(30) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100),
        image VARCHAR(200) NULL DEFAULT NULL,
        description TEXT NULL DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    `);
    await connection.query(`
    CREATE TABLE links (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        url VARCHAR(400) NOT NULL,
        titulo VARCHAR(200) NOT NULL,
        image VARCHAR(200) NULL DEFAULT NULL,
        description VARCHAR(200) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `);
    await connection.query(`
    CREATE TABLE ratings (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      user_id INTEGER NOT NULL,
      link_id INTEGER NOT NULL,
      rating INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (link_id) REFERENCES links(id) ON DELETE CASCADE
  );
    `);

    await connection.query(`
    CREATE TABLE comments (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      user_id INTEGER NOT NULL,
      link_id INTEGER NOT NULL,
      comment_text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (link_id) REFERENCES links(id) ON DELETE CASCADE
    );
  `);

  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
