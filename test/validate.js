const assert = require('assert');
const oidcTokenHash = require('..');

/* eslint-disable max-len, space-in-parens */

// non correct lengths
assert(!oidcTokenHash(
  'x7vk7f6BvQj0jQHYFI',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'RS256'
));
assert(!oidcTokenHash(
  'x7vk7fx7vk7f6BvQj0jQHYFI',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'RS256'
));

assert(!oidcTokenHash('', '', 'none'));
assert(!oidcTokenHash(null, null, 'none'));
assert(!oidcTokenHash(null, undefined, 'none'));
assert(!oidcTokenHash(undefined, null, 'none'));
assert(!oidcTokenHash(undefined, undefined, 'none'));

// 256 lengths
assert( oidcTokenHash(
  'x7vk7f6BvQj0jQHYFIk4ag',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'HS256'
));
assert(!oidcTokenHash(
  'x7vk7f6BvQj0jQHYFIk4ag',
  '--JiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'HS256'
));
assert(!oidcTokenHash(
  '--vk7f6BvQj0jQHYFIk4--',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'HS256'
));

// 384 lengths
assert( oidcTokenHash(
  'rEF91trffQGMQVyqcnZvwddyQGLs6GTF',
  'NjlkNjk2ZGUtZWQ1YS00MmQ3LWExOGUtMjNiYTY2MDU4YjJhYmJls2NqVk9DX1z2vDl4MZMeF2XLfMwiXWmRYzUL0t_IY1nWFp6Moeu2GVmBoT_d0Acl4upDyfdGRjeR-ZIsUQ',
  'RS384'
));
assert(!oidcTokenHash(
  'rEF91trffQGMQVyqcnZvwddyQGLs6GTF',
  '--lkNjk2ZGUtZWQ1YS00MmQ3LWExOGUtMjNiYTY2MDU4YjJhYmJls2NqVk9DX1z2vDl4MZMeF2XLfMwiXWmRYzUL0t_IY1nWFp6Moeu2GVmBoT_d0Acl4upDyfdGRjeR-ZIsUQ',
  'RS384'
));
assert(!oidcTokenHash(
  '--F91trffQGMQVyqcnZvwddyQGLs6G--',
  'NjlkNjk2ZGUtZWQ1YS00MmQ3LWExOGUtMjNiYTY2MDU4YjJhYmJls2NqVk9DX1z2vDl4MZMeF2XLfMwiXWmRYzUL0t_IY1nWFp6Moeu2GVmBoT_d0Acl4upDyfdGRjeR-ZIsUQ',
  'RS384'
));

// 512 lengths
assert( oidcTokenHash(
  'HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM',
  'N2IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA',
  'ES512'
));
assert(!oidcTokenHash(
  'HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM',
  '--IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA',
  'ES512'
));
assert(!oidcTokenHash(
  '--IOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1--',
  'N2IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA',
  'ES512'
));

// mismatch between header alg and the length of the hash
assert(!oidcTokenHash(
  'x7vk7f6BvQj0jQHYFIk4ag',
  'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw',
  'RS384'
));
assert(!oidcTokenHash(
  'rEF91trffQGMQVyqcnZvwddyQGLs6GTF',
  'NjlkNjk2ZGUtZWQ1YS00MmQ3LWExOGUtMjNiYTY2MDU4YjJhYmJls2NqVk9DX1z2vDl4MZMeF2XLfMwiXWmRYzUL0t_IY1nWFp6Moeu2GVmBoT_d0Acl4upDyfdGRjeR-ZIsUQ',
  'RS256'
));
assert(!oidcTokenHash(
  'HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM',
  'N2IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA',
  'RS256'
));
