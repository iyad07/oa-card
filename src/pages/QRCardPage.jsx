import { useMemo } from 'react'
import avatarImg from '../assets/DSC00533.png'
import linkedinLogo from '../assets/ph_linkedin-logo.png'
import xLogo from '../assets/ph_x-logo.png'
import instagramLogo from '../assets/ph_instagram-logo.png'
import facebookLogo from '../assets/ph_facebook-logo.png'
import ContactsPanel from '../components/ContactsPanel'
import PrimaryButton from '../components/PrimaryButton'
import SocialIcons from '../components/SocialIcons'
import IconDownload from '../icons/DownloadIcon'
import QRBrandHero from '../components/QRBrandHero'



export default function QRCardPage() {
  const person = useMemo(() => ({
    name: 'Charis Borquaye',
    title: 'Financial Analyst',
    location: 'Ghana',
    phone: '(505) 555-0125',
    email: 'at@oamarkets.com',
    website: 'oamarkets.com',
    address: '1 Norfo Close, Dzorwulu, Accra',
  }), [])

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

  return (
    <div className="space-y-2">
      {/* Brand + Hero */}
      <QRBrandHero person={person} avatarUrl={avatarUrl} />

      {/* Contacts */}
      <ContactsPanel person={person} />

      {/* Social icons */}
      <SocialIcons />

      {/* Actions */}
      <div className="flex items-center gap-3">
        <PrimaryButton label="Save Contact" onClick={handleSaveContact} />
        <a className="card flex h-11 w-11 items-center justify-center p-0" href={`https://${person.website}`} target="_blank" rel="noreferrer" aria-label="Visit website">
          <IconDownload />
        </a>
      </div>
    </div>
  )
}