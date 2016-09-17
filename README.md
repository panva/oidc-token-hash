# oidc-token-hash

[![build][travis-image]][travis-url] [![dependencies][david-image]][david-url] [![npm][npm-image]][npm-url] [![licence][licence-image]][licence-url]

oidc-token-hash validates (and generates) ID Token claims like at_hash or c_hash for OpenID Clients
and Providers.

## Usage

Validating
```js
const oidcTokenHash = require('oidc-token-hash');

const at_hash = 'x7vk7f6BvQj0jQHYFIk4ag';
const access_token = 'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw';

oidcTokenHash(at_hash, access_token); // => true
oidcTokenHash(at_hash, 'foobar'); // => false
oidcTokenHash.valid('foobar', access_token); // => false
```

Generating
```js
// access_token from first example
oidcTokenHash.generate(access_token); // => 'x7vk7f6BvQj0jQHYFIk4ag'
oidcTokenHash.generate(access_token, 384); // => 'ups_76_7CCye_J1WIyGHKVG7AAs2olYm'
oidcTokenHash.generate(access_token, 512); // => 'EGEAhGYyfuwDaVTifvrWSoD5MSy_5hZPy6I7Vm-7pTQ'
```

[travis-image]: https://img.shields.io/travis/panva/oidc-token-hash/master.svg?style=flat-square&maxAge=7200
[travis-url]: https://travis-ci.org/panva/oidc-token-hash
[david-image]: https://img.shields.io/david/panva/oidc-token-hash.svg?style=flat-square&maxAge=7200
[david-url]: https://david-dm.org/panva/oidc-token-hash
[npm-image]: https://img.shields.io/npm/v/oidc-token-hash.svg?style=flat-square&maxAge=7200
[npm-url]: https://www.npmjs.com/package/oidc-token-hash
[licence-image]: https://img.shields.io/github/license/panva/oidc-token-hash.svg?style=flat-square&maxAge=7200
[licence-url]: LICENSE.md
