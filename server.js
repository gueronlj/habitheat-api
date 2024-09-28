const express = require('express')
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

const userController = require(`./controllers/users_controller.js`)
app.use(`/api/user`, cors(), userController)

const habitController = require(`./controllers/habits_controller.js`)
app.use(`/api/habits`, cors(), habitController)

app.listen(3000, () => {
  console.log('Server started on port 3000');
});



