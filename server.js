const express = require('express')
const cors = require('cors')
const app = express();

const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());

const userController = require(`./controllers/users_controller.js`)
app.use(`/api/user`, userController)

const habitController = require(`./controllers/habits_controller.js`)
app.use(`/api/habits`, habitController)

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.get(`*`, (req, res) => {
  res.send('<h1> 404 Not Found <h1>');
})


