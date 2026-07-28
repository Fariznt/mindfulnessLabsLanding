// Turn known page phrases into markdown links the chat UI can render.
// Already-linked markdown segments are left alone.

const REPLACEMENTS = [
  { re: /\bcontact form\b/gi, to: '[contact form](#contact)' },
  { re: /\bmailing list\b/gi, to: '[mailing list](#contact)' },
  { re: /\bhow it works\b/gi, to: '[how it works](#about)' },
  { re: /\bour story\b/gi, to: '[our story](#our-story)' },
  { re: /\bintro video\b/gi, to: '[intro video](#video)' },
  { re: /\bInstagram\b/g, to: '[Instagram](https://www.instagram.com/mindfulnesslabs_ai/)' },
  { re: /\bLinkedIn\b/g, to: '[LinkedIn](https://www.linkedin.com/company/mindfulness-labs/)' },
]

export function injectPageLinks(text) {
  // Split so we don't rewrite text that's already inside [label](url)
  return String(text)
    .split(/(\[[^\]]+\]\([^)]+\))/g)
    .map((part, i) => {
      if (i % 2 === 1) return part
      let out = part
      for (const { re, to } of REPLACEMENTS) {
        out = out.replace(re, to)
      }
      return out
    })
    .join('')
}
