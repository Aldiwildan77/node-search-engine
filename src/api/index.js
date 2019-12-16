const express = require('express');
const cors = require('cors');

const app = express();
const { NODE_ENV, PORT } = require('../config');

const quotesRoute = require('./routes/quotes');

const start = () => {
  app.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/quotes', quotesRoute)
    .use((err, req, res) => {
      res.status(500).json({
        status: 'error',
        message: `${req.originalUrl} - Not Found`,
        stack: NODE_ENV === 'production' ? {} : err.stack
      });
    })
    .listen(PORT, () => console.log(`Server is running at port ${PORT}`));
}

module.exports = { start };