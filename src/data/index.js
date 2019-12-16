const elastic = require('../elastic');
const quotes = require('./quotes.json');

const esAction = {
  index: {
    _index: elastic.index,
    _type: elastic.type
  },
  populateDatabase: () => {
    const docs = [];
    for (const quote of quotes) {
      docs.push(esAction);
      docs.push(quote);
    }
    return elastic.esClient.bulk({ body: docs });
  }
}

module.exports = esAction;
