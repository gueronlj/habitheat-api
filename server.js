const express = require('express')
const cors = require('cors')
const app = express();

const corsOptions ={
  origin:'http://localhost:5173', 
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



