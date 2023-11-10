const express = require('express');
const user = express.Router();
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

//fetch a user by email
user.get('/:email', async (req, res) => {
   try{
      const response = await pool.query(`
      SELECT * FROM users WHERE email = $1;`, [req.params.email]);
      res.json(response.rows);
   } catch(e){
      res.send(`Error: ${e.message}`);
   }
})

//fetch user_id by email
user.get('/:email/id', async (req, res) => {
   try{
      const response = await pool.query(`
      SELECT id FROM users WHERE email = $1 LIMIT 1;`, [req.params.email]);
      res.json(response.rows);
   } catch(e){
      res.send(`Error: ${e.message}`);
   }
})

//create new user
user.post('/', async (req, res) => {
   try{
      const response = await pool.query(`
      insert into users (email) values ($1) returning *;`, [req.body.email]);
      res.json(response.rows);
   } catch(e){
      res.send(`Error: ${e.message}`);
   }
})

module.exports = user
