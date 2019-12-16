const quotesModel = require('../models/quotes');

const quotesController = {
  getQuotes: async (req, res) => {
    const query = req.query;
    if (!query.text) {
      return res.status(422).json({
        status: 'error',
        data: 'Missing required parameter: text'
      });
    }

    try {
      const result = await quotesModel.getQuotes(query);
      return res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        status: 'success',
        message: 'Unknown error'
      });
    }
  },

  addQuote: async (req, res) => {
    const body = req.body;
    if (!body.quote || !body.author) {
      return res.status(422).json({
        error: true,
        data: "Missing required parameter(s): 'body' or 'author'"
      });
    }

    try {
      const result = await model.insertNewQuote(body.quote, body.author);
      return res.status(201).json({
        status: 'success',
        data: {
          id: result.body._id,
          author: body.author,
          quote: body.quote
        }
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Unknown error'
      });
    }
  }
}

module.exports = { ...quotesController };
