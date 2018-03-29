/**
 * org service will use to create and update org
 * scenarios for create org:
 * 1) each org has unique id(can be domain style name) and usually an display name
 * 2) each org has three embed roles: admin, member, everyone, org can add as many roles as required
 * 3) when create an org, will add creator as admin of org
 * 4) user can join org, when add user to org, it will add user to default join role of org
 * and more, user can join as many roles as required, it can apply by user or assign by admin
 * 5) org can install app, when install app, will add one row in appstore and 
 * add roles, operations and workflows into org(see description in appstore service)
 * 6) user can access operations and workflows in org, to show user's operations and workflows
 * system will first find users' roles in org and then list all user's operations from user's roles
 * more detail in operations service
 * 7) user can find orgs for self, to find user's orgs, should first find roles for user and then find orgs 
 * for user
 * 8) org has a property of orgs, which specify relationships with other org, actually the relationships
 * between org is the relationships between roles of org, so in orgs, it will define role relationships
 * like  { tags: [], master: { roles: []}, guest: { include-operation-roles: [], exclude-operation-roles: []}}
 * tags use for names of relationship for org
 */
// Initializes the `orgs` service on path `/orgs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/orgs.model');
const hooks = require('./orgs.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'orgs',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/orgs', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('orgs');

  service.hooks(hooks);
};
