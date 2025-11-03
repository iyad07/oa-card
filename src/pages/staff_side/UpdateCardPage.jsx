import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { slugToName, nameToSlug } from '../../utils/slug'
import { useAuth } from '../../utils/AuthContext.jsx'
import { getVcardUrl, getQrPngUrl } from '../../utils/api'
import avatarImg from '../../assets/DSC00533.png'
import linkedinLogo from '../../assets/ph_linkedin-logo.png'
import xLogo from '../../assets/ph_x-logo.png'
import instagramLogo from '../../assets/ph_instagram-logo.png'
import facebookLogo from '../../assets/ph_facebook-logo.png'
import BrandHero from '../../components/BrandHero'
import QRBrandHero from '../../components/QRBrandHero'
import ContactsPanel from '../../components/ContactsPanel'
import PrimaryButton from '../../components/PrimaryButton'
import SocialIcons from '../../components/SocialIcons'
import IconDownload from '../../icons/DownloadIcon'
import shareIconPng from '../../assets/ph_share-network.png'
import IconShare from '../../icons/ShareIcon'
import SmileyIcon from '../../icons/SmileyIcon'



export default function UpdateCardPage() {
  const [isQRMode, setIsQRMode] = useState(false)
  const { name: nameParam } = useParams()
  const displayName = useMemo(() => (nameParam ? slugToName(nameParam) : 'Charis Borquaye'), [nameParam])
  const navigate = useNavigate()
  const { userId, profile, logout } = useAuth()
  const person = useMemo(() => ({
    name: profile?.fullName || displayName,
    title: profile?.position || 'Financial Analyst',
    location: profile?.location || 'Ghana',
    phone: profile?.phoneNumber || '(505) 555-0125',
    email: profile?.email || 'at@oamarkets.com',
    website: profile?.website || 'oamarkets.com',
    address: profile?.address || '1 Norfo Close, Dzorwulu, Accra',
  }), [profile, displayName])

  const avatarUrl = avatarImg

  const handleSaveContact = () => {
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

  const handleLogout = () => {
    logout()
    navigate('/staff')
  }

  return (
    <div className="space-y-2 lg:flex lg:flex-row lg:gap-4">
      {/* 5/6 width column */}
      <div className="w-full lg:w-[90%] space-y-2">
        {/* Brand + Hero */}
        {isQRMode ? (
          <QRBrandHero
            person={person}
            avatarUrl={avatarUrl}
            onBackClick={() => setIsQRMode(false)}
            qrImageUrl={userId ? getQrPngUrl(userId) : undefined}
          />
        ) : (
          <BrandHero person={person} avatarUrl={avatarUrl} onQrClick={() => setIsQRMode(true)} />
        )}

        {/* Contacts */}
        <ContactsPanel person={person} />
        <div className="sm:hidden">
          <SocialIcons />
        </div>
        {/* Actions */}
        <div className="flex items-center gap-3">
          
          <PrimaryButton label="Update Contact" onClick={() => navigate(`/staff/edit/${nameToSlug(person.name)}`)} />
          <a className="card flex h-11 w-11 items-center justify-center p-0" href={`https://${person.website}`} target="_blank" rel="noreferrer" aria-label="Visit website">
            <IconShare/>
          </a>
        </div>
      </div>

      {/* 1/6 width column (desktop-only) */}
      <div className="hidden lg:block">
        <div className="space-y-3">
          <button type="button" className="flex items-center gap-2 text-[#00272B]" aria-label="Share card">
            <img src={shareIconPng} alt="Share" className="h-5 w-5 object-contain" />
            <span className="text-sm">Share</span>
          </button>
          {userId ? (
            <a
              href={getVcardUrl(userId)}
              className="flex items-center gap-2 text-[#00272B]"
              aria-label="Download vCard"
            >
              <IconDownload />
              <span className="text-sm">Download</span>
            </a>
          ) : (
            <button type="button" className="flex items-center gap-2 text-[#00272B] opacity-60" aria-label="Download vCard" disabled>
              <IconDownload />
              <span className="text-sm">Download</span>
            </button>
          )}
          <button type="button" className="flex items-center gap-2 text-[#00272B]" aria-label="Logout" onClick={handleLogout}>
            <SmileyIcon />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}
  const handleLogout = () => {
    logout()
    navigate('/staff')
  }