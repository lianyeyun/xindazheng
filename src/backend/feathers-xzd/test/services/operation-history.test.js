const assert = require('assert');
const app = require('../../src/app');

describe('\'operationHistory\' service', () => {
  it('registered the service', () => {
    const service = app.service('operation-history');

    assert.ok(service, 'Registered the service');
  });
});
