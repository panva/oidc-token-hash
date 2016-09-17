'use strict';

const assert = require('assert');
const createHash = require('crypto').createHash;
const encode = require('base64url').encode;

const LENGTHS = { 22: 'sha256', 32: 'sha384', 43: 'sha512' };

function validate(actual, token) {
  if (!actual) return false;
  const alg = LENGTHS[actual.length];
  if (!alg) return false;
  return generate(token, alg) === actual;
}

function generate(token, alg) {
  assert.equal(typeof token, 'string');

  const size = String(alg).slice(-3);
  let hashAlg;

  switch (size) {
    case '512':
      hashAlg = 'sha512';
      break;
    case '384':
      hashAlg = 'sha384';
      break;
    default:
      hashAlg = 'sha256';
  }

  const digest = createHash(hashAlg).update(token).digest('hex');
  return encode(new Buffer(digest.slice(0, digest.length / 2), 'hex'));
}

const oidcTokenHash = validate;
oidcTokenHash.generate = generate;
oidcTokenHash.valid = validate;

module.exports = oidcTokenHash;
