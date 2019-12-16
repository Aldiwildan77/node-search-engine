const NODE_ENV = process.env.NODE_ENV || 'localhost';
if (NODE_ENV === 'development') require('dotenv').config();

const PORT = process.env.PORT || '5015';
const ELASTIC_URL = process.env.ELASTIC_URL || 'http://localhost:9200';

module.exports = { NODE_ENV, PORT, ELASTIC_URL };