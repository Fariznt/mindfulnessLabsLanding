// Markdown links: [label](href). Only #anchors and http(s) are treated as links.
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

function isSafeHref(href) {
  return href.startsWith('#') || /^https?:\/\//i.test(href)
}

export function parseChatLinks(text) {
  const parts = []
  let lastIndex = 0
  let match

  LINK_RE.lastIndex = 0
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) })
    }

    const label = match[1]
    const href = match[2]
    if (isSafeHref(href)) {
      parts.push({ type: 'link', value: label, href })
    } else {
      // Reject javascript:/data: etc. — keep the raw markdown as plain text
      parts.push({ type: 'text', value: match[0] })
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) })
  }

  return parts.length ? parts : [{ type: 'text', value: text }]
}
