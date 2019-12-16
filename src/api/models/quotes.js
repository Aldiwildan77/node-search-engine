const { esClient, index, type } = require("../../elastic");

const quotesModel = {
  getQuotes: async (req) => {
    const query = {
      query: {
        match: {
          quote: {
            query: req.text,
            operator: 'and',
            fuzziness: 'auto'
          }
        }
      }
    }

    const { body: { hits } } = await esClient.search({
      from: req.page || 0,
      size: req.limit || 100,
      index,
      type,
      body: query
    });

    const results = hits.total.value;
    const values = hits.hits.map((hit) => {
      return {
        id: hit._id,
        quote: hit._source.quote,
        author: hit._source.author,
        score: hit._score
      }
    });

    return {
      results,
      values
    }
  },
  insertNewQuote: (quote, author) => {
    return esClient.index({
      index,
      type,
      body: {
        quote,
        author
      }
    });
  }
}

module.exports = { ...quotesModel };
