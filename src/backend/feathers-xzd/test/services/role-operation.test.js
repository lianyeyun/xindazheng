const assert = require('assert');
const app = require('../../src/app');

describe('\'role-operation\' service', () => {
  it('registered the service', () => {
    const service = app.service('role-operation');

    assert.ok(service, 'Registered the service');
  });
});
