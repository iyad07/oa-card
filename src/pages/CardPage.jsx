import { useMemo, useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import avatarImg from '../assets/DSC00533.png'
import linkedinLogo from '../assets/ph_linkedin-logo.png'
import xLogo from '../assets/ph_x-logo.png'
import instagramLogo from '../assets/ph_instagram-logo.png'
import facebookLogo from '../assets/ph_facebook-logo.png'
import BrandHero from '../components/BrandHero'
import QRBrandHero from '../components/QRBrandHero'
import ContactsPanel from '../components/ContactsPanel'
import PrimaryButton from '../components/PrimaryButton'
import SocialIcons from '../components/SocialIcons'
import IconDownload from '../icons/DownloadIcon'
import { slugToName, nameToSlug } from '../utils/slug'
import { useAuth } from '../utils/AuthContext.jsx'
import { getVcardUrl } from '../utils/api'



export default function CardPage() {
  const [isQRMode, setIsQRMode] = useState(false)
  const { name: nameParam, id: idParam } = useParams()
  const { isReady, userId, profile } = useAuth()

  // Public vCard state for scan/:id when viewer is not authenticated
  const [publicPerson, setPublicPerson] = useState(null)
  const [publicLoadState, setPublicLoadState] = useState('idle') // 'idle' | 'loading' | 'loaded' | 'error'

  const profileSlug = useMemo(() => (profile?.fullName ? nameToSlug(profile.fullName) : ''), [profile])
  const routeSlugNormalized = useMemo(() => (
    nameParam ? nameToSlug(slugToName(nameParam)) : ''
  ), [nameParam])
  const displayName = useMemo(() => (nameParam ? slugToName(nameParam) : (profile?.fullName || '')),[nameParam, profile])

  const person = useMemo(() => ({
    name: profile?.fullName || displayName || 'Unknown',
    title: profile?.position || 'Financial Analyst',
    location: profile?.location || 'Ghana',
    phone: profile?.phoneNumber || '(505) 555-0125',
    email: profile?.email || 'at@oamarkets.com',
    website: profile?.website || 'oamarkets.com',
    address: profile?.address || '1 Norfo Close, Dzorwulu, Accra',
  }), [profile, displayName])

  const avatarUrl = avatarImg

  const handleSaveContact = () => {
    // Prefer backend vCard if authenticated and userId is available
    if (userId) {
      const a = document.createElement('a')
      a.href = getVcardUrl(userId)
      a.download = ''
      document.body.appendChild(a)
      a.click()
      a.remove()
      return
    }
    // Fallback: generate local vCard
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${person.name}`,
      `TITLE:${person.title}`,
      `TEL;TYPE=CELL:${person.phone}`,
      `EMAIL:${person.email}`,
      `ADR;TYPE=HOME:;;${person.address};${person.location}`,
      `URL:https://${person.website}`,
      'END:VCARD',
    ].join('\n')
    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${person.name.replace(/\s+/g, '_')}.vcf`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  // When viewing /scan/:id and not the authenticated owner, fetch the public vCard
  useEffect(() => {
    const shouldFetchPublic = Boolean(idParam && (!userId || idParam !== userId))
    if (!shouldFetchPublic) {
      return
    }
    let aborted = false
    setPublicLoadState('loading')
    // Fetch raw vCard text and parse minimal fields for display
    fetch(getVcardUrl(idParam))
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch vCard')
        const text = await res.text()
        if (aborted) return
        const lines = text.split(/\r?\n/)
        const getField = (prefix) => {
          const line = lines.find((l) => l.startsWith(prefix))
          return line ? line.slice(prefix.length) : ''
        }
        const rawName = getField('FN:') || 'Unknown'
        const rawTitle = getField('TITLE:') || ''
        const rawPhone = (() => {
          const telLine = lines.find((l) => l.startsWith('TEL'))
          if (!telLine) return ''
          const idx = telLine.indexOf(':')
          return idx !== -1 ? telLine.slice(idx + 1) : ''
        })()
        const rawEmail = getField('EMAIL:') || ''
        const rawUrl = getField('URL:') || ''
        const website = rawUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'oamarkets.com'
        const adrLine = lines.find((l) => l.startsWith('ADR'))
        let address = ''
        let location = ''
        if (adrLine) {
          const idx = adrLine.indexOf(':')
          const payload = idx !== -1 ? adrLine.slice(idx + 1) : ''
          const parts = payload.split(';')
          // vCard ADR: PO Box; Extended; Street; City; Region; Postal; Country
          const street = parts[2] || ''
          const city = parts[3] || ''
          const country = parts[6] || ''
          address = [street, city].filter(Boolean).join(', ')
          location = country || city || 'Ghana'
        }
        const parsed = {
          name: rawName,
          title: rawTitle || '—',
          location: location || 'Ghana',
          phone: rawPhone || '—',
          email: rawEmail || '—',
          website,
          address: address || '—',
        }
        setPublicPerson(parsed)
        setPublicLoadState('loaded')
      })
      .catch(() => {
        if (aborted) return
        setPublicLoadState('error')
      })
    return () => { aborted = true }
  }, [idParam, userId])

  // Determine existence:
  // - For /scan/:id → render if:
  //     a) id matches authenticated userId, or
  //     b) public vCard fetched successfully
  // - For /:name     → render only if slug matches authenticated profile slug
  const existsInBackend = idParam
    ? Boolean((userId && idParam === userId) || publicPerson)
    : Boolean(profile && profileSlug && routeSlugNormalized === profileSlug)

  // For named routes, wait for auth hydration; for scan routes, allow while public fetch runs
  if (!idParam && !isReady) {
    return null
  }

  // If the person does not exist in backend (and public fetch failed), redirect to 404
  if (!existsInBackend) {
    // Allow public fetch to complete for scan routes before redirecting
    if (idParam && publicLoadState === 'loading') {
      return null
    }
    return <Navigate to="/404" replace />
  }

  return (
    <div className="space-y-2">
      {/* Brand + Hero */}
      {isQRMode ? (
        <QRBrandHero person={idParam && publicPerson ? publicPerson : person} avatarUrl={avatarUrl} onBackClick={() => setIsQRMode(false)} />
      ) : (
        <BrandHero person={idParam && publicPerson ? publicPerson : person} avatarUrl={avatarUrl} onQrClick={() => setIsQRMode(true)} />
      )}

      {/* Contacts */}
      <ContactsPanel person={idParam && publicPerson ? publicPerson : person} />

      {/* Social icons */}
      <SocialIcons />

      {/* Actions */}
      <div className="flex items-center gap-3">
        <PrimaryButton label={userId ? 'Download vCard' : 'Save Contact'} onClick={handleSaveContact} />
        <a className="card flex h-11 w-11 items-center justify-center p-0" href={`https://${(idParam && publicPerson ? publicPerson.website : person.website)}`} target="_blank" rel="noreferrer" aria-label="Visit website">
          <IconDownload />
        </a>
      </div>
    </div>
  )
}