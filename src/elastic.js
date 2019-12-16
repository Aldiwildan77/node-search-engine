const { Client } = require('@elastic/elasticsearch');
const { ELASTIC_URL } = require('./config');
const esClient = new Client({ node: ELASTIC_URL });

const index = 'quotes';
const type = 'quotes';

const ES = {
  createIndex: async (index) => {
    try {
      await esClient.indices.create({ index })
    } catch (error) {
      console.error(`An error occurred while creating the index ${index}:`);
      console.error(error);
    }
  },

  setQuotesMapping: async () => {
    try {
      const schema = {
        quote: {
          type: 'text'
        },
        author: {
          type: 'text'
        }
      }

      await esClient.indices.putMapping({
        index,
        type,
        include_type_name: true,
        body: {
          properties: schema
        }
      })

      console.log('Quotes mapping created successfully');
    } catch (error) {
      console.error('An error occurred while setting the quotes mapping:');
      console.error(error);
    }
  },

  checkConnection: async () => {
    return new Promise(async (resolve) => {
      console.log('Checking connection to ElasticSearch...');
      let isConnected = false;

      while (!isConnected) {
        try {
          await esClient.cluster.health({})
          console.log('Successfully connected to ElasticSearch');
          isConnected = true;
        } catch (_) { }
      }

      resolve(true);
    });
  },
}

module.exports = { esClient, ES, index, type };
