/**
 * senarios for using operations service:
 * 1) add operation when install app into org, each operation has roles property 
 * which contain roles from installing org(may populated from role match or added 
 * org roles directly)
 * 2) operation have two status: active or not, if active, role can access it, otherwise can not
 * 3) operation can be processed by single or multiple, allow_concurrent to define to allow how many concurrent
 * users is processiong operation, and concurrent_users specify concurrent users who are processing operation
 * 4) when operation is running, there is one more service processing-operations use to handle 
 * running operations
 * 5）there is one more service operation_history use to record operation
 */
// Initializes the `operations` service on path `/operations`
const createService = require('feathers-mongoose');
const createModel = require('../../models/operations.model');
const hooks = require('./operations.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'operations',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/operations', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('operations');

  service.hooks(hooks);
};
