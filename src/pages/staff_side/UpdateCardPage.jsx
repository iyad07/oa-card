import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { slugToName, nameToSlug } from '../../utils/slug'
import { useAuth } from '../../utils/AuthContext.jsx'
import { getVcardUrl, getQrPngUrl } from '../../utils/api'
import avatarImg from '../../assets/DSC00533.png'
import BrandHero from '../../components/BrandHero'
import QRBrandHero from '../../components/QRBrandHero'
import ContactsPanel from '../../components/ContactsPanel'
import PrimaryButton from '../../components/PrimaryButton'
import SocialIcons from '../../components/SocialIcons'
import IconDownload from '../../icons/DownloadIcon'
import shareIconPng from '../../assets/share_icon.svg'
import IconShare from '../../icons/ShareIcon'
import SmileyIcon from '../../icons/SmileyIcon'
import SkeletonCard from '../../components/SkeletonCard'



export default function UpdateCardPage() {
  const [isQRMode, setIsQRMode] = useState(false)
  const { name: nameParam } = useParams()
  const displayName = useMemo(() => (nameParam ? slugToName(nameParam) : '-'), [nameParam])
  const navigate = useNavigate()
  const { userId, profile, logout, isReady } = useAuth()
  const person = useMemo(() => ({
    name: profile?.fullName || 'Unknown',
    title: profile?.position || 'Unknown',
    location: profile?.location || 'Unknown',
    phone: profile?.phoneNumber || 'Unknown',
    email: profile?.email || 'Unknown',
    website: userId
      ? `${window.location.host}/scan/${userId}`
      : (profile?.website?.replace(/^https?:\/\//, '').replace(/\/$/, '') || 'Unknown'),
    address: profile?.address || 'Unknown',
  }), [profile, displayName])

  const avatarUrl = avatarImg

  // Show skeleton while auth hydrates or profile still loading from backend
  const isLoading = !isReady || !profile
  if (isLoading) {
    // Use the same skeleton layout as CardPage for consistency
    return <SkeletonCard />
  }

 
  const handleLogout = () => {
    logout()
    navigate('/staff')
  }

  const handleShare = async () => {
    const slug = nameToSlug(person.name || displayName || 'digital-id')
    const shareUrl =`${window.location.origin}/scan/${userId}`
    const shareData = {
      title: `${person.name} | OA Digital ID`,
      text: 'View my OneAfrica Markets Digital ID',
      url: shareUrl,
    }
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch (_) {
        // user cancelled or share failed; continue to fallback
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Link copied to clipboard. Share it in your apps!')
    } catch (_) {
      window.prompt('Copy this link to share:', shareUrl)
    }
  }

  return (
    <div className="space-y-2 lg:flex lg:flex-row lg:gap-4">
      {/* 5/6 width column */}
      <div className="lg:w-[95%] space-y-2">
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
          <SocialIcons links={profile?.socialLinks || {}} />
        </div>
        {/* Actions */}
        <div className="flex items-center gap-3">
          
          <PrimaryButton label="Update Contact" onClick={() => navigate(`/staff/edit/${nameToSlug(person.name)}`)} />
          {userId ? (
            <a
              className="sm:hidden card flex h-11 w-11 items-center justify-center p-0"
              href={getQrPngUrl(userId)}
              download
              aria-label="Download QR code"
            >
              <IconDownload />
            </a>
          ) : (
            <button type="button" className="sm:hidden card flex h-11 w-11 items-center justify-center p-0 opacity-60" aria-label="Download QR code" disabled>
              <IconDownload />
            </button>
          )}
          <button type="button" className="card flex h-11 w-11 items-center justify-center p-0" onClick={handleShare} aria-label="Share card">
            <IconShare/>
          </button>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="space-y-3">
          <button type="button" className="flex items-center gap-2 text-[#00272B]" aria-label="Share card" onClick={handleShare}>
            <img src={shareIconPng} alt="Share" className="h-5 w-5 object-contain" />
            <span className="text-sm">Share</span>
          </button>
          {userId ? (
            <a
              href={getQrPngUrl(userId)}
              className="flex items-center gap-2 text-[#00272B]"
              aria-label="Download QR code"
              download
            >
              <IconDownload />
              <span className="text-sm">Download QR</span>
            </a>
          ) : (
            <button type="button" className="flex items-center gap-2 text-[#00272B] opacity-60" aria-label="Download QR code" disabled>
              <IconDownload />
              <span className="text-sm">Download QR</span>
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