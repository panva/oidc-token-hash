const { strict: assert } = require('assert');
const { createHash } = require('crypto');

const fc = require('fast-check');

const { generate, validate } = require('../lib');

const options = { numRuns: 1000 };
const tokens = fc.string({ unit: 'grapheme', maxLength: 512 });
const nonEmptyTokens = fc.string({ unit: 'grapheme', minLength: 1, maxLength: 512 });
const names = fc.string({ unit: 'grapheme', minLength: 1, maxLength: 64 });

const algorithms = [
  ['HS256', 'sha256'],
  ['RS256', 'sha256'],
  ['PS256', 'sha256'],
  ['ES256', 'sha256'],
  ['ES256K', 'sha256'],
  ['HS384', 'sha384'],
  ['RS384', 'sha384'],
  ['PS384', 'sha384'],
  ['ES384', 'sha384'],
  ['HS512', 'sha512'],
  ['RS512', 'sha512'],
  ['PS512', 'sha512'],
  ['ES512', 'sha512'],
  ['Ed25519', 'sha512'],
];

function reference(token, algorithm, outputLength) {
  const hash = outputLength ? createHash(algorithm, { outputLength }) : createHash(algorithm);
  const digest = hash.update(token).digest();
  return digest
    .subarray(0, digest.length / 2)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

fc.assert(
  fc.property(tokens, fc.constantFrom(...algorithms), (token, [alg, digest]) => {
    assert.equal(generate(token, alg), reference(token, digest));
  }),
  options
);

fc.assert(
  fc.property(tokens, (token) => {
    const sha256 = generate(token, 'HS256');
    const sha384 = generate(token, 'HS384');
    const sha512 = generate(token, 'HS512');

    ['RS256', 'PS256', 'ES256', 'ES256K'].forEach((alg) => {
      assert.equal(generate(token, alg), sha256);
    });
    ['RS384', 'PS384', 'ES384'].forEach((alg) => {
      assert.equal(generate(token, alg), sha384);
    });
    ['RS512', 'PS512', 'ES512', 'Ed25519'].forEach((alg) => {
      assert.equal(generate(token, alg), sha512);
    });
  }),
  options
);

fc.assert(
  fc.property(tokens, (token) => {
    assert.equal(generate(token, 'Ed448'), reference(token, 'shake256', 114));
    assert.equal(generate(token, 'EdDSA', 'Ed448'), reference(token, 'shake256', 114));
    assert.equal(generate(token, 'EdDSA', 'Ed25519'), reference(token, 'sha512'));

    const expected = reference(token, 'shake256', 64);
    ['ML-DSA-44', 'ML-DSA-65', 'ML-DSA-87'].forEach((alg) => {
      assert.equal(generate(token, alg), expected);
    });
  }),
  options
);

fc.assert(
  fc.property(tokens, (token) => {
    [
      ['HS256', 22],
      ['HS384', 32],
      ['HS512', 43],
      ['Ed448', 76],
      ['ML-DSA-65', 43],
    ].forEach(([alg, length]) => {
      const value = generate(token, alg);
      assert.match(value, /^[A-Za-z0-9_-]+$/);
      assert.equal(value.length, length);
    });
  }),
  options
);

fc.assert(
  fc.property(nonEmptyTokens, names, names, (token, claim, source) => {
    const actual = generate(token, 'ES256');
    const identifiers = { claim, source };

    assert.doesNotThrow(() => validate(identifiers, actual, token, 'ES256'));

    const mutated = `${actual[0] === 'A' ? 'B' : 'A'}${actual.slice(1)}`;
    assert.throws(() => validate(identifiers, mutated, token, 'ES256'));
  }),
  options
);
