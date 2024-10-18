const assert = require('assert');

const oidcTokenHash = require('..');

const shake256 = require('../lib/shake256');

/* eslint-disable max-len, space-in-parens */

assert.throws(() => oidcTokenHash.validate(
  { claim: '', source: 'access_token' }
), { name: /TypeError/, message: 'names.claim must be a non-empty string' });
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: '' }
), { name: /TypeError/, message: 'names.source must be a non-empty string' });
assert.throws(() => oidcTokenHash.validate(
  { claim: 0, source: 'access_token' }
), { name: /TypeError/, message: 'names.claim must be a non-empty string' });
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 0 }
), { name: /TypeError/, message: 'names.source must be a non-empty string' });

assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'x7vk7f6BvQj0jQHYFI',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'madeupalg'
), { name: /AssertionError/, message: /unrecognized or invalid JWS algorithm provided/ });

// non correct lengths
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'x7vk7f6BvQj0jQHYFI',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'RS256'
), { name: /AssertionError/, message: /at_hash mismatch, expected x7vk7f6BvQj0jQHYFIk4ag, got: x7vk7f6BvQj0jQHYFI/ });
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'x7vk7fx7vk7f6BvQj0jQHYFI',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'RS256'
), { name: /AssertionError/, message: /at_hash mismatch, expected x7vk7f6BvQj0jQHYFIk4ag, got: x7vk7fx7vk7f6BvQj0jQHYFI/ });

assert.throws(() => oidcTokenHash.validate({ claim: 'at_hash', source: 'access_token' }, '', 'foo', 'HS256'), { name: /AssertionError/, message: 'at_hash must be a non-empty string' });
assert.throws(() => oidcTokenHash.validate({ claim: 'at_hash', source: 'access_token' }, 'foo', '', 'HS256'), { name: /AssertionError/, message: 'access_token must be a non-empty string' });
assert.throws(() => oidcTokenHash.validate({ claim: 'at_hash', source: 'access_token' }, null, 'foo', 'HS256'), { name: /AssertionError/, message: 'at_hash must be a non-empty string' });
assert.throws(() => oidcTokenHash.validate({ claim: 'at_hash', source: 'access_token' }, 'foo', null, 'HS256'), { name: /AssertionError/, message: 'access_token must be a non-empty string' });
assert.throws(() => oidcTokenHash.validate({ claim: 'at_hash', source: 'access_token' }, undefined, 'foo', 'HS256'), { name: /AssertionError/, message: 'at_hash must be a non-empty string' });
assert.throws(() => oidcTokenHash.validate({ claim: 'at_hash', source: 'access_token' }, 'foo', undefined, 'HS256'), { name: /AssertionError/, message: 'access_token must be a non-empty string' });
assert.throws(() => oidcTokenHash.validate({ claim: 'at_hash', source: 'access_token' }, 0, 'foo', 'HS256'), { name: /AssertionError/, message: 'at_hash must be a non-empty string' });
assert.throws(() => oidcTokenHash.validate({ claim: 'at_hash', source: 'access_token' }, 'foo', 0, 'HS256'), { name: /AssertionError/, message: 'access_token must be a non-empty string' });

// 256 lengths
assert(!oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'x7vk7f6BvQj0jQHYFIk4ag',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'HS256'
));
assert(!oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'x7vk7f6BvQj0jQHYFIk4ag',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'ES256'
));
assert(!oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'x7vk7f6BvQj0jQHYFIk4ag',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'ES256K'
));
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'x7vk7f6BvQj0jQHYFIk4ag',
  '--JiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'HS256'
), { name: /AssertionError/, message: /at_hash mismatch, expected n7fjT8SGm5ThW4f3zFRYBg, got: x7vk7f6BvQj0jQHYFIk4ag/ });
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  '--vk7f6BvQj0jQHYFIk4--',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'HS256'
), { name: /AssertionError/, message: /at_hash mismatch, expected x7vk7f6BvQj0jQHYFIk4ag, got: --vk7f6BvQj0jQHYFIk4--/ });

// 384 lengths
assert(!oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'rEF91trffQGMQVyqcnZvwddyQGLs6GTF',
  'NjlkNjk2ZGUtZWQ1YS00MmQ3LWExOGUtMjNiYTY2MDU4YjJhYmJls2NqVk9DX1z2vDl4MZMeF2XLfMwiXWmRYzUL0t_IY1nWFp6Moeu2GVmBoT_d0Acl4upDyfdGRjeR-ZIsUQ',
  'RS384'
));
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'rEF91trffQGMQVyqcnZvwddyQGLs6GTF',
  '--lkNjk2ZGUtZWQ1YS00MmQ3LWExOGUtMjNiYTY2MDU4YjJhYmJls2NqVk9DX1z2vDl4MZMeF2XLfMwiXWmRYzUL0t_IY1nWFp6Moeu2GVmBoT_d0Acl4upDyfdGRjeR-ZIsUQ',
  'RS384'
), { name: /AssertionError/, message: /at_hash mismatch, expected AbnGYqUea5QYS505GJcm97screFkcCGQ, got: rEF91trffQGMQVyqcnZvwddyQGLs6GTF/ });
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  '--F91trffQGMQVyqcnZvwddyQGLs6G--',
  'NjlkNjk2ZGUtZWQ1YS00MmQ3LWExOGUtMjNiYTY2MDU4YjJhYmJls2NqVk9DX1z2vDl4MZMeF2XLfMwiXWmRYzUL0t_IY1nWFp6Moeu2GVmBoT_d0Acl4upDyfdGRjeR-ZIsUQ',
  'RS384'
), { name: /AssertionError/, message: /at_hash mismatch, expected rEF91trffQGMQVyqcnZvwddyQGLs6GTF, got: --F91trffQGMQVyqcnZvwddyQGLs6G--/ });

// 512 lengths
assert(!oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM',
  'N2IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA',
  'ES512'
));
assert(!oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM',
  'N2IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA',
  'EdDSA',
  'Ed25519'
));
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM',
  'N2IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA',
  'EdDSA',
  'edfoo'
), { name: /AssertionError/, message: /unrecognized or invalid EdDSA curve provided/ });
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM',
  'N2IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA',
  'EdDSA',
  'Ed448'
), {
  name: /AssertionError/,
  message:
  shake256
    ? /at_hash mismatch, expected wvAJtH9mg9RPIhRyZ7Ji-w4ihw6NuRLxhAF6_6X37fVXSLdpyxxTbc32iOHKGMap-rzC0-4H3A5Z, got: HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM/
    : /not supported in your Node.js runtime version/,
});
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM',
  '--IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA',
  'ES512'
), { name: /AssertionError/, message: /at_hash mismatch, expected IvHMT4I56xNW8OVJW1_gB4UOPLsiX6iPbX3eSBfNfXo, got: HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM/ });
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  '--IOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1--',
  'N2IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA',
  'ES512'
), { name: /AssertionError/, message: /at_hash mismatch, expected HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM, got: --IOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1--/ });

// mismatch between header alg and the length of the hash
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'x7vk7f6BvQj0jQHYFIk4ag',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'RS384'
), { name: /AssertionError/, message: /at_hash mismatch, expected ups_76_7CCye_J1WIyGHKVG7AAs2olYm, got: x7vk7f6BvQj0jQHYFIk4ag/ });
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'rEF91trffQGMQVyqcnZvwddyQGLs6GTF',
  'NjlkNjk2ZGUtZWQ1YS00MmQ3LWExOGUtMjNiYTY2MDU4YjJhYmJls2NqVk9DX1z2vDl4MZMeF2XLfMwiXWmRYzUL0t_IY1nWFp6Moeu2GVmBoT_d0Acl4upDyfdGRjeR-ZIsUQ',
  'RS256'
), { name: /AssertionError/, message: /at_hash mismatch, expected uLvLJzpaRoJQiSGRDpq2sg, got: rEF91trffQGMQVyqcnZvwddyQGLs6GTF/ });
assert.throws(() => oidcTokenHash.validate(
  { claim: 'at_hash', source: 'access_token' },
  'HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM',
  'N2IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA',
  'RS256'
), { name: /AssertionError/, message: /at_hash mismatch, expected a_8m332a5VeA9DZTBIa_Cg, got: HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM/ });
