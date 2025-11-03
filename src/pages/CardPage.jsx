import { useMemo, useState } from 'react'
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
  const { name: nameParam } = useParams()
  const { isReady, userId, profile } = useAuth()

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

  // Determine existence: only show backend-backed card if profile exists and slug matches
  const existsInBackend = Boolean(profile && profileSlug && routeSlugNormalized === profileSlug)

  if (!isReady) {
    return null
  }

  // If the person does not exist in backend, redirect to 404 immediately
  if (isReady && !existsInBackend) {
    return <Navigate to="/404" replace />
  }

  return (
    <div className="space-y-2">
      {/* Brand + Hero */}
      {isQRMode ? (
        <QRBrandHero person={person} avatarUrl={avatarUrl} onBackClick={() => setIsQRMode(false)} />
      ) : (
        <BrandHero person={person} avatarUrl={avatarUrl} onQrClick={() => setIsQRMode(true)} />
      )}

      {/* Contacts */}
      <ContactsPanel person={person} />

      {/* Social icons */}
      <SocialIcons />

      {/* Actions */}
      <div className="flex items-center gap-3">
        <PrimaryButton label={userId ? 'Download vCard' : 'Save Contact'} onClick={handleSaveContact} />
        <a className="card flex h-11 w-11 items-center justify-center p-0" href={`https://${person.website}`} target="_blank" rel="noreferrer" aria-label="Visit website">
          <IconDownload />
        </a>
      </div>
    </div>
  )
}