// config/conexion.js
import pkg from 'pg';  // Importar el módulo completo
const { Pool } = pkg;  // Desestructuramos 'Pool' de 'pg'

import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user:     process.env.DB_PGUSER,
    host:     process.env.DB_PGHOST,
    database: process.env.DB_PGDATABASE,
    password: process.env.DB_PGPASSWORD,
    port:     process.env.DB_PGPORT,
    max:      20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    });

const queryDB = async (queryText, params) => {
  const client = await pool.connect();
  try {
    const res = await client.query(queryText, params);
    return res.rows;
  } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    throw err;
  } finally {
    client.release();
  }
};

// Exporta el método queryDB como parte de un objeto
export default { queryDB };
