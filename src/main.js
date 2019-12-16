const elastic = require('./elastic');
const data = require('./data');
const api = require('./api');

(main = async () => {
  const isElasticReady = await elastic.ES.checkConnection();
  if (isElasticReady) {
    const elasticIndex = await elastic.esClient.indices.exists({ index: elastic.index });
    if (!elasticIndex.body) {
      await elastic.ES.createIndex(elastic.index);
      await elastic.ES.setQuotesMapping();
      await data.populateDatabase();
    }
  }

  api.start();
})();