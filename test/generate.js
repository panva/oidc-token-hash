const assert = require('assert');

const oidcTokenHash = require('..');
const shake256 = require('../lib/shake256');

/* eslint-disable max-len */

assert.equal('xsZZrUssMXjL3FBlzoSh2g', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'RS256'));
assert.equal('xsZZrUssMXjL3FBlzoSh2g', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'PS256'));
assert.equal('xsZZrUssMXjL3FBlzoSh2g', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'ES256'));
assert.equal('xsZZrUssMXjL3FBlzoSh2g', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'ES256K'));
assert.equal('xsZZrUssMXjL3FBlzoSh2g', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'HS256'));

assert.equal('adt46pcdiB-l6eTNifgoVM-5AIJAxq84', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'RS384'));
assert.equal('adt46pcdiB-l6eTNifgoVM-5AIJAxq84', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'PS384'));
assert.equal('adt46pcdiB-l6eTNifgoVM-5AIJAxq84', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'ES384'));
assert.equal('adt46pcdiB-l6eTNifgoVM-5AIJAxq84', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'HS384'));

assert.equal('p2LHG4H-8pYDc0hyVOo3iIHvZJUqe9tbj3jESOuXbkY', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'RS512'));
assert.equal('p2LHG4H-8pYDc0hyVOo3iIHvZJUqe9tbj3jESOuXbkY', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'PS512'));
assert.equal('p2LHG4H-8pYDc0hyVOo3iIHvZJUqe9tbj3jESOuXbkY', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'ES512'));
assert.equal('p2LHG4H-8pYDc0hyVOo3iIHvZJUqe9tbj3jESOuXbkY', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'HS512'));

assert.equal('p2LHG4H-8pYDc0hyVOo3iIHvZJUqe9tbj3jESOuXbkY', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'EdDSA', 'Ed25519'));

if (shake256) {
  assert.equal('sB_U72jyb0WgtX8TsVoqJnm6CD295W9gfSDRxkilB3LAL7REi9JYutRW_s1yE4lD8cOfMZf83gi4', oidcTokenHash.generate('YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL', 'EdDSA', 'Ed448'));
}
