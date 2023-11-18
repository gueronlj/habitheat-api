const express = require('express');
const habit = express.Router();
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

//fetch all habbits of user by user_id
habit.get('/:id', async (req, res) => {
   try{
      const response = await pool.query(`
      SELECT * FROM habits 
      WHERE user_id = $1
      ORDER BY id ASC;`, [req.params.id]);
      res.json(response.rows);
   } catch(e){
      res.send(`Error: ${e.message}`);
   }
})

//insert new habit
habit.post('/:id', async (req, res) => {
   try {
      const response = await pool.query(`
         INSERT INTO habits (title, dates, user_id) 
         VALUES ($1, $2, $3) returning *;`, 
         [req.body.title, req.body.dates, req.params.id]
      );
      res.json(response.rows);
   } catch(e) {
      res.send(`Error: ${e.message}`);
   }
})

habit.put('/:habitId', async (req, res) => {
   try{
      const response = await pool.query(`
      UPDATE habits
      SET dates = array_append(dates, $1)
      WHERE id = $2 returning *;`,
         [req.body, req.params.habitId]
      );
      res.json(response.rows);
   } catch(e){
      res.send(`Error: ${e.message}`);
   }
})

habit.delete('/:id', async (req, res) => {
   try {
      const response = await pool.query(`
         DELETE FROM habits WHERE id = $1 returning *;`, 
         [req.params.id]
      );
      res.json(response.rows);
   } catch(e) {
      res.send(`Error: ${e.message}`);
   } 
})

//update habit
// habit.put('/:id/DONTUSE', async (req, res) => {
//    try {
//       const response = await pool.query(`
//          UPDATE habits SET dates = $1 WHERE id = $2 returning *;`, 
//          [req.body.dates, req.params.id]
//       );
//       res.json(response.rows);
//    } catch(e) {
//       res.send(`Error: ${e.message}`);
//    }
// })

module.exports = habit