var express = require('express');
var http = require('http')
var app = express();
var PORT = 3001;
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
})

app.post('/sendMessage', (req, res) => {
  const uid = req.body.uid;
  const message = req.body.message;

  console.log(uid);
  console.log(message);
})