const crypto = require('crypto');
if(!process || process.version === undefined) {
  throw new TypeError("This library cannot be used outside of Node.js.");
}
const [major, minor] = process.version.substring(1).split('.').map((x) => parseInt(x, 10));
const xofOutputLength = major > 12 || (major === 12 && minor >= 8);
const shake256 = xofOutputLength && crypto.getHashes().includes('shake256');

module.exports = shake256;
