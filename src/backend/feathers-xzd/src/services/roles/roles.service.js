/**
 * some scenarios to use this service:
 * 1) role must belong to some org, so role have org property
 * 2) there is a role-user service to handle user role relationship
 * 3) there is a role-operation service for handling role-to-operation relationship,
 * in role-operation model, should contain two properties, one is include-operation-roles
 * and the other is exclude-operation-roles
 * if one guest role will include operations of children, should specify like 
 * {roleId: xxx, recursive-children: true, recursive-parent: true},
 * by default, guest role is recursive for include or exclude, if don't want 
 * default recursive, can specify like {roleId:xxx, recursive: false}
 * if role in exlusive list, apply to exclude first
 * 4) role can have parent role by parent property
 */
// Initializes the `roles` service on path `/roles`
const createService = require('feathers-mongoose');
const createModel = require('../../models/roles.model');
const hooks = require('./roles.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'roles',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/roles', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('roles');

  service.hooks(hooks);
};
