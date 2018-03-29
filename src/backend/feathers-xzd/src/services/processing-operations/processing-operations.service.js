/**
 * using scenarios for this service:
 * 1) one user begin to process opeation, process info will store through this service
 * 2) there is progress property for processing operation, progress value from 0 to 100
 * 3) sometime, when processing operation is part of workflow, it can raise event to 
 * callback to workflow according to stratege in operation definition.
 */
// Initializes the `processing-operations` service on path `/processing-operations`
const createService = require('feathers-mongoose');
const createModel = require('../../models/processing-operations.model');
const hooks = require('./processing-operations.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'processing-operations',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/processing-operations', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('processing-operations');

  service.hooks(hooks);
};
