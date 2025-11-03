export function nameToSlug(name) {
  if (!name) return ''
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumerics
    .replace(/\s+/g, '-') // spaces to dashes
    .replace(/-+/g, '-') // collapse multiple dashes
}

export function slugToName(slug) {
  if (!slug) return ''
  const decoded = decodeURIComponent(slug)
  return decoded
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}