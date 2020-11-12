const expect = require('chai').expect;
const sinon = require('sinon');

const execute = require('../');

/**
 * Lease-calculator unit tests.
 */

 describe('Unit Tests', () => {

    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Invoke Lease-calculator', () => {
        // TODO
    });
});
