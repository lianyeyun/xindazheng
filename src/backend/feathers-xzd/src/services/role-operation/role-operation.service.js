// Initializes the `role-operation` service on path `/role-operation`
const createService = require('feathers-mongoose');
const createModel = require('../../models/role-operation.model');
const hooks = require('./role-operation.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'role-operation',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/role-operation', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('role-operation');

  service.hooks(hooks);
};
