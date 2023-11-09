const express = require('express');
const user = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

user.get('/:id/habits', async (req, res) => {
   try{
      const response = await pool.query(`
      select * from habits where user_id = '${req.params.id}';`)
      res.json(response.rows);
   } catch(e){
      res.send(`Error: ${e.message}`);
   }
})

module.exports = user
