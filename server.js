const express = require('express')
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

const userController = require(`./controllers/users_controller.js`)
app.use(`/api/user`, userController)

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

app.get(`*`, (req, res) => {
  res.send('<h1> 404 Not Found <h1>');
})


