import assert from 'node:assert/strict'
import { parseChatLinks } from './parseChatLinks.js'
import { injectPageLinks } from './injectPageLinks.js'

assert.deepEqual(
  parseChatLinks('Reach us via the [contact form](#contact).'),
  [
    { type: 'text', value: 'Reach us via the ' },
    { type: 'link', value: 'contact form', href: '#contact' },
    { type: 'text', value: '.' },
  ]
)
assert.deepEqual(
  parseChatLinks('See [Instagram](https://www.instagram.com/mindfulnesslabs_ai/).'),
  [
    { type: 'text', value: 'See ' },
    { type: 'link', value: 'Instagram', href: 'https://www.instagram.com/mindfulnesslabs_ai/' },
    { type: 'text', value: '.' },
  ]
)
assert.ok(
  parseChatLinks('Bad [x](javascript:alert(1)) link').every((p) => p.type === 'text'),
  'unsafe hrefs must not become links'
)

assert.equal(
  injectPageLinks('Use the contact form on this page.'),
  'Use the [contact form](#contact) on this page.'
)
assert.equal(
  injectPageLinks('Already [contact form](#contact) linked.'),
  'Already [contact form](#contact) linked.'
)
assert.equal(
  injectPageLinks('See how it works and our story.'),
  'See [how it works](#about) and [our story](#our-story).'
)

assert.deepEqual(
  parseChatLinks(injectPageLinks('Use the contact form please.')),
  [
    { type: 'text', value: 'Use the ' },
    { type: 'link', value: 'contact form', href: '#contact' },
    { type: 'text', value: ' please.' },
  ]
)

console.log('lib checks: ok')
