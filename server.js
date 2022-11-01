const express = require('express');
const app = express();

/**
 * Initial Server.js created by node.
 */
app.get('/hello', (req, res) =>
  res.send('Hello World!'));

const PORT = 4000;
app.listen(PORT);
