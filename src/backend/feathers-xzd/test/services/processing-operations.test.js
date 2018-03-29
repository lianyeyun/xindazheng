const assert = require('assert');
const app = require('../../src/app');

describe('\'processing-operations\' service', () => {
  it('registered the service', () => {
    const service = app.service('processing-operations');

    assert.ok(service, 'Registered the service');
  });
});
