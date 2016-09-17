'use strict';

const assert = require('assert');
const oidcTokenHash = require('..');

/* eslint-disable max-len, space-in-parens */

// non correct lengths
assert.ok(!oidcTokenHash('x7vk7f6BvQj0jQHYFI', 'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw'));
assert.ok(!oidcTokenHash('x7vk7fx7vk7f6BvQj0jQHYFI', 'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw'));

assert.ok(!oidcTokenHash('', ''));
assert.ok(!oidcTokenHash(null, null));
assert.ok(!oidcTokenHash(null, undefined));
assert.ok(!oidcTokenHash(undefined, null));
assert.ok(!oidcTokenHash(undefined, undefined));

// 256 lengths
assert.ok( oidcTokenHash('x7vk7f6BvQj0jQHYFIk4ag', 'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw'));
assert.ok(!oidcTokenHash('x7vk7f6BvQj0jQHYFIk4ag', '--JiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw'));
assert.ok(!oidcTokenHash('--vk7f6BvQj0jQHYFIk4--', 'YmJiZTAwYmYtMzgyOC00NzhkLTkyOTItNjJjNDM3MGYzOWIy9sFhvH8K_x8UIHj1osisS57f5DduL-ar_qw5jl3lthwpMjm283aVMQXDmoqqqydDSqJfbhptzw8rUVwkuQbolw'));

// 384 lengths
assert.ok( oidcTokenHash('rEF91trffQGMQVyqcnZvwddyQGLs6GTF', 'NjlkNjk2ZGUtZWQ1YS00MmQ3LWExOGUtMjNiYTY2MDU4YjJhYmJls2NqVk9DX1z2vDl4MZMeF2XLfMwiXWmRYzUL0t_IY1nWFp6Moeu2GVmBoT_d0Acl4upDyfdGRjeR-ZIsUQ'));
assert.ok(!oidcTokenHash('rEF91trffQGMQVyqcnZvwddyQGLs6GTF', '--lkNjk2ZGUtZWQ1YS00MmQ3LWExOGUtMjNiYTY2MDU4YjJhYmJls2NqVk9DX1z2vDl4MZMeF2XLfMwiXWmRYzUL0t_IY1nWFp6Moeu2GVmBoT_d0Acl4upDyfdGRjeR-ZIsUQ'));
assert.ok(!oidcTokenHash('--F91trffQGMQVyqcnZvwddyQGLs6G--', 'NjlkNjk2ZGUtZWQ1YS00MmQ3LWExOGUtMjNiYTY2MDU4YjJhYmJls2NqVk9DX1z2vDl4MZMeF2XLfMwiXWmRYzUL0t_IY1nWFp6Moeu2GVmBoT_d0Acl4upDyfdGRjeR-ZIsUQ'));

// 512 lengths
assert.ok( oidcTokenHash('HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM', 'N2IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA'));
assert.ok(!oidcTokenHash('HgIOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1KM', '--IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA'));
assert.ok(!oidcTokenHash('--IOjpEKMhvtwzZvjUdUmMYayc0gOvaxkZEsautS1--', 'N2IwZmM5Y2YtZWJiYS00ZjA5LTkyZTktZTc0MjY5NDlmZDUwv7m2UfVNLyXYhcEicgYZ5LsQbZ7huJNibUjqAmPAWhyyxWRgXdZp4iTl2lE2ezdC3W-x93gkIg00rNok1MYgqA'));
