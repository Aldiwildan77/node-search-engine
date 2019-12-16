const router = require('express').Router();
const quotesController = require('../controllers/quotes');

router.get('/', quotesController.getQuotes);
router.post('/new', quotesController.addQuote);

module.exports = router;