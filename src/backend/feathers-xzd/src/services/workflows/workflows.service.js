/**
 * some using scenarios for workflow include:
 * 1) workflows have works array property, each work has properties of 
 * work.sid(string id for work, can use number), work.queue,
 * work.operations, work.workflows, work.data
 * 2) work will be processed one by one, previous work will can start next work
 * in respond to some condition.
 * 3) all operations is target to process in a work
 * 4) can add workflow into work, workflow in work will execute seperately
 * 5) each work can have a condition to start next work, in each work
 * there is also a condition for operation to callback work service to
 * check condition to start next work
 */ 
// Initializes the `workflows` service on path `/workflows`
const createService = require('feathers-mongoose');
const createModel = require('../../models/workflows.model');
const hooks = require('./workflows.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'workflows',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/workflows', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('workflows');

  service.hooks(hooks);
};
