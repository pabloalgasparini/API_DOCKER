const myswl2 = require('mysql2');

function createConnection() {
  const connection = myswl2.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'docker',
    database: process.env.DATABASE_NAME || 'kiosko',
  });
  return connection;
}

async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS productos (
    id INT NOT NULL AUTO_INCREMENT,
    nom_prod VARCHAR(100) NOT NULL,
    precio_prod FLOAT NOT NULL,
    PRIMARY KEY (id)
  )`;

  const conn = createConnection();
  return conn.promise().query(sql);
}

module.exports = { createConnection, createTable };
