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

//fetch all habbits of user by users email
habit.get('/:email', async (req, res) => {
   try{
      const response = await pool.query(`
      SELECT * FROM habits 
      WHERE user_email = $1
      ORDER BY id ASC;`, [req.params.email]);
      res.json(response.rows);
   } catch(e){
      res.send(`Error: ${e.message}`);
   }
})

//fetch habit by habit_id
habit.get('/id/:id', async (req, res) => {
   try{
      const response = await pool.query(`
      SELECT * FROM habits 
      WHERE id = $1;`, [req.params.id]);
      res.json(response.rows);
   } catch(e){
      res.send(`Error: ${e.message}`);
   }
})

//insert new habit
habit.post('/:id', async (req, res) => {
   try {
      const response = await pool.query(`
         INSERT INTO habits (title, dates, user_email) 
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

habit.put('/edit/:habitId', async (req, res) => {
   try {
      const response = await pool.query(`
      UPDATE habits
      SET dates = (
         CASE 
            WHEN array_length(dates, 1) > 0 
            THEN dates[1:array_length(dates, 1) - 1]
            ELSE dates
         END
      )
      WHERE id = $1
      RETURNING *;`,
      [req.params.habitId]
      );
      res.json(response.rows);
   } catch(e) {
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