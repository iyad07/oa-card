import linkedinLogo from '../assets/ph_linkedin-logo.png'
import xLogo from '../assets/ph_x-logo.png'
import instagramLogo from '../assets/ph_instagram-logo.png'
import facebookLogo from '../assets/ph_facebook-logo.png'

export default function SocialIcons({ links }) {
  const normalizeUrl = (url) => {
    if (!url || typeof url !== 'string') return ''
    const trimmed = url.trim()
    if (!trimmed) return ''
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  }

  const items = [
    { key: 'linkedin', label: 'LinkedIn', icon: linkedinLogo },
    { key: 'twitter', label: 'X', icon: xLogo },
    { key: 'instagram', label: 'Instagram', icon: instagramLogo },
    { key: 'facebook', label: 'Facebook', icon: facebookLogo },
  ]

  const linksProvided = links !== undefined && links !== null
  const available = items
    .map((it) => ({ ...it, href: normalizeUrl(linksProvided ? links?.[it.key] : undefined) }))
    .filter((it) => Boolean(it.href))

  // If no links object provided at all, fall back to showing all icons (non-clickable)
  const showFallback = !linksProvided

  return (
    <div className="flex items-center justify-between py-2 text-gray-700">
      {showFallback
        ? items.map((it) => (
            <button key={it.key} className="rounded-lg" aria-label={it.label} type="button">
              <img src={it.icon} alt={it.label} className="h-[35px] w-[35px] object-contain" />
            </button>
          ))
        : available.length > 0
          ? available.map((it) => (
              <a
                key={it.key}
                className="rounded-lg"
                aria-label={it.label}
                href={it.href}
                target="_blank"
                rel="noreferrer"
              >
                <img src={it.icon} alt={it.label} className="h-[35px] w-[35px] object-contain" />
              </a>
            ))
          : null}
    </div>
  )
}