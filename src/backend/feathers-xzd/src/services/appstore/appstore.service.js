// Initializes the `appstore` service on path `/appstore`
/** this service use to save app information
 * each time when install app into org, will add a row into model(db)
 * so columns should include: installor(id, org_id, time,...), distributor(org_id), creator(org_id),
 * definition(optional, if first time created, will added from client, if distribute from other org
 * keep to null, defintion should include appid(unique), appname, description(brief, details[array]), 
 * roles array and operations array and workflows array, roles array include predefined roles
 * for operations, and operations array include operation data and workflows array include workflow data)
 * scenarios for using appstore may include:
 * 1)when first create app, distributor.org_id, creator.org_id, and installor.org_id should be same
 * otherwise, they are not same with each others.
 * 2)every time, when install app into org, will added operation into org and link org's roles to operation from creator
 * app defintion, 
 * 3)each install will add roles, operations and workflows into org and link with org's real roles
 * 4)when creator change definition, will inform all installor to update app
 * 5)each app have there own roles and should be prefix with appid and name should be like appid_rolename, because
 * each org have embed 3 roles: admin, member, everyone, so if app roles without prefix for these three roles, will
 * directely link org embed roles to operation.
 * 6)app's operations and workflows is classified to required or optional, each time when install app, will list all optional operations and workflows
 * for installer to choose and then install operations and workflows into org
 * 7)when install operation for org, will ask installer to install app role or choose role from org
 */
const createService = require('feathers-mongoose');
const createModel = require('../../models/appstore.model');
const hooks = require('./appstore.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'appstore',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/appstore', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('appstore');

  service.hooks(hooks);
};
