import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


//db connection 
// const pool = new Pool({
//      user: process.env.DB_USER,
//      host: process.env.DB_HOST,
//      database: process.env.DB_NAME,
//      password: process.env.DB_PASSWORD,
//      port: process.env.DB_PORT,
// });




//API route to delete the message from the db
app.delete('/delete/:id', async (req, res) => {

     const { id } = req.params;

     try {
          await pool.query('DELETE FROM messages WHERE id = $1', [id]);
          res.status(200).json({ message: 'Deleted Successfully' });
     } catch (err) {
          console.log(err);
          res.status(500).json({ error: 'Delete failed' });
     }
})




//API route to save the messages in the db
app.post('/save', async (req, res) => {

     const { text } = req.body;

     try {
          const result = await pool.query(
               'INSERT INTO messages (text) VALUES($1) RETURNING * ',
               [text]
          );
          res.json(result.rows[0]);
     } catch (err) {
          console.error(err);
          res.status(500).send('ERROR');
     }
});




// api route to display messages on the frontend 
app.get('/messages', async (req, res) => {
     try {
          const result = await pool.query('SELECT * FROM messages ORDER by id DESC');
          res.json(result.rows);
     } catch (err) {
          console.error(err);
          res.status(500).send('Error');
     }
});





// api route to update a specific note in the db
app.put('/update/:id', async (req, res) => {
     try {
          const { id } = req.params;
          const { text } = req.body;
          console.log(id, text);

          const updatedNote = await pool.query('UPDATE messages SET text = $1 WHERE id = $2', [text, id]);
          res.sendStatus(200);// success signal
     } catch (err) {
          console.log(err.message);
          res.status(500).send('Server Error 05');
     }
})





// api route to toggle checkbox of a specific note in the db
app.put('/toggleCheckbox/:id', async (req, res) => {
     try {
          const { id } = req.params;
          const { completed } = req.body;

          const updatedNote = await pool.query('UPDATE messages SET completed = $1 WHERE id = $2', [!completed, id]);
          res.sendStatus(200);// success signal
     } catch (err) {
          console.log(err.message);
          res.status(500).send('Server Error 07');
     }
})





app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));