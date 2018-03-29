// Initializes the `operationHistory` service on path `/operation-history`
const createService = require('feathers-mongoose');
const createModel = require('../../models/operation-history.model');
const hooks = require('./operation-history.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'operation-history',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/operation-history', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('operation-history');

  service.hooks(hooks);
};
