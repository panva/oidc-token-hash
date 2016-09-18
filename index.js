'use strict';

const assert = require('assert');
const createHash = require('crypto').createHash;
const encode = require('base64url').encode;

const LENGTHS = { 22: 'sha256', 32: 'sha384', 43: 'sha512' };
const ALGS = ['sha256', 'sha384', 'sha512'];

function validate(actual, token) {
  if (!actual) return false;
  const alg = LENGTHS[actual.length];
  if (!alg) return false;
  return generate(token, alg) === actual;
}

function generate(token, alg) {
  assert.equal(typeof token, 'string');

  let hashAlg;
  if (ALGS.indexOf(alg) === -1) {
    const size = String(alg).slice(-3);

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
  }

  const digest = createHash(hashAlg || alg).update(token).digest();
  return encode(digest.slice(0, digest.length / 2));
}

const oidcTokenHash = validate;
oidcTokenHash.generate = generate;
oidcTokenHash.valid = validate;

module.exports = oidcTokenHash;
