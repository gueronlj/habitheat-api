const postgres = require('postgres');
require('dotenv').config();

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function getPostgresVersion() {
  const response = await sql`select version()`;
  console.log(response);
}

getPostgresVersion();