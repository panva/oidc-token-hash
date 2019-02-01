const assert = require('assert');
const { createHash } = require('crypto');

const fromBase64 = base64 => base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
const encode = input => fromBase64(input.toString('base64'));

/** SPECIFICATION
 * Its (_hash) value is the base64url encoding of the left-most half of the hash of the octets of
 * the ASCII representation of the token value, where the hash algorithm used is the hash algorithm
 * used in the alg Header Parameter of the ID Token's JOSE Header. For instance, if the alg is
 * RS256, hash the token value with SHA-256, then take the left-most 128 bits and base64url encode
 * them. The _hash value is a case sensitive string.
 */

/**
 * @name getSHAsize
 * @api private
 *
 * returns the sha length based off the JOSE alg heade value, defaults to sha256
 *
 * @param token {String} token value to generate the hash from
 * @param alg {String} ID Token JOSE header alg value (i.e. RS256, HS384, ES512, PS256)
 */
function getSHAsize(alg) {
  const size = String(alg).slice(-3);

  switch (size) {
    case '512':
      return 'sha512';
    case '384':
      return 'sha384';
    default:
      return 'sha256';
  }
}

/**
 * @name generate
 * @api public
 *
 * Generates a `_hash` value from an token value.
 *
 * @param token {String} token value to generate the hash from
 * @param alg {String} ID Token JOSE header alg value (i.e. RS256, HS384, ES512, PS256)
 */
function generate(token, alg) {
  assert.equal(typeof token, 'string', 'first argument must be a string');

  const digest = createHash(getSHAsize(alg)).update(token).digest();
  return encode(digest.slice(0, digest.length / 2));
}

/**
 * @name validate
 * @api public
 *
 * Validates the provided _hash value is matching the token and appropriate alg value
 *
 * @param actual {String} _hash value from an ID Token
 * @param token {String} token value
 * @param alg {String} ID Token JOSE header alg value (i.e. RS256, HS384, ES512, PS256)
 */
function validate(actual, token, alg) {
  assert.equal(arguments.length, 3, 'three arguments required');

  if (!actual || !token) return false;
  return generate(token, getSHAsize(alg)) === actual;
}

module.exports = validate;
module.exports.valid = validate;
module.exports.generate = generate;
