const users = require('./users/users.service.js');
const orgs = require('./orgs/orgs.service.js');
const roles = require('./roles/roles.service.js');
const appstore = require('./appstore/appstore.service.js');
const operations = require('./operations/operations.service.js');
const workflows = require('./workflows/workflows.service.js');
const processingOperations = require('./processing-operations/processing-operations.service.js');
const operationHistory = require('./operation-history/operation-history.service.js');
const roleOperation = require('./role-operation/role-operation.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(orgs);
  app.configure(roles);
  app.configure(appstore);
  app.configure(operations);
  app.configure(workflows);
  app.configure(processingOperations);
  app.configure(operationHistory);
  app.configure(roleOperation);
};
