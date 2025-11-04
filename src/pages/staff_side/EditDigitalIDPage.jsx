import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import PrimaryButton from '../../components/PrimaryButton'
import brandImg from '../../assets/Frame 16.png'
import linkedinLogo from '../../assets/ph_linkedin-logo.png'
import xLogo from '../../assets/ph_x-logo.png'
import instagramLogo from '../../assets/ph_instagram-logo.png'
import facebookLogo from '../../assets/ph_facebook-logo.png'
import avatarImg from '../../assets/DSC00533.png'
import BrandHero from '../../components/BrandHero'
import ContactsPanel from '../../components/ContactsPanel'
import SocialIcons from '../../components/SocialIcons'
import { slugToName, nameToSlug } from '../../utils/slug'
import { useAuth } from '../../utils/AuthContext.jsx'
import SkeletonEditCard from '../../components/SkeletonEditCard'
import { getUser as apiGetUser, updateUser as apiUpdateUser } from '../../utils/api'

export default function EditDigitalIDPage() {
  const { name: nameParam } = useParams()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState(() => (nameParam ? slugToName(nameParam) : ''))
  const [phone, setPhone] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [xUrl, setXUrl] = useState('')
  const [instagram, setInstagram] = useState('')
  const [facebook, setFacebook] = useState('')
  const { userId, refreshProfile, isReady } = useAuth()
  const [isHydrating, setIsHydrating] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      if (!userId) {
        setIsHydrating(false)
        return
      }
      setIsHydrating(true)
      try {
        const { data } = await apiGetUser(userId)
        setFullName(data.fullName || '')
        setPhone(data.phoneNumber || '')
        setLinkedin(data?.socialLinks?.linkedin || '')
        setXUrl(data?.socialLinks?.twitter || '')
        setInstagram(data?.socialLinks?.instagram || '')
      } catch (_) {
        // ignore
      } finally {
        setIsHydrating(false)
      }
    }
    loadProfile()
  }, [userId])

  const handleSave = async (e) => {
    e.preventDefault()
    if (!userId) {
      alert('You must be logged in to update your profile.')
      return
    }
    const payload = {
      fullName,
      phoneNumber: phone,
      socialLinks: {
        linkedin: linkedin || undefined,
        twitter: xUrl || undefined,
        instagram: instagram || undefined,
      },
    }
    try {
      const { data } = await apiUpdateUser(userId, payload)
      await refreshProfile()
      alert('Profile updated successfully.')
      navigate(`/staff/update/${nameToSlug(fullName || 'Charis Borquaye')}`)
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to update profile'
      alert(msg)
    }
  }

  const person = useMemo(() => ({
    name: fullName || 'Charis Borquaye',
    title: 'Financial Analyst',
    location: 'Ghana',
    email: 'at@oamarkets.com',
    phone: phone || '(505) 555-0125',
    website: 'oamarkets.com',
    address: '1 Norfo Close, Dzorwulu, Accra',
  }), [fullName, phone])

  const avatarUrl = avatarImg

  // Show skeleton while auth hydrates or profile is being fetched
  if (!isReady || isHydrating) {
    return <SkeletonEditCard />
  }

  return (
    <div className="rounded-2xl bg-[#F3F8F8]  shadow-sm lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 space-y-6">
      {/* Left column: form */}
      <div className="space-y-6  p-4 rounded-xl">
        {/* Brand header */}
        <div className="flex items-center gap-2 lg:hidden">
          <img src={brandImg} alt="OneAfrica Markets" className="h-6 w-auto" />
        </div>

        {/* Back link */}
        <Link to={`/staff/update/${nameToSlug(fullName || 'Charis Borquaye')}`} className="text-[#00272B] text-sm inline-flex items-center gap-1">
          <span aria-hidden>←</span> Back
        </Link>

        {/* Page title */}
        <h1 className="text-2xl font-medium text-[#00272B]">Edit Your OneAfrica Markets Digital ID</h1>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-5">
          {/* Full name */}
          <div className="space-y-2">
            <label htmlFor="full-name" className="block text-sm text-[#00272B]">
              Your Full Name
            </label>
            <input
              id="full-name"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#00272B] focus:outline-none focus:ring-2 focus:ring-[#00272B]"
            />
          </div>

          {/* Phone number */}
          <div className="space-y-2">
            <label htmlFor="phone-number" className="block text-sm text-[#00272B]">
              Phone number
            </label>
            <input
              id="phone-number"
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#00272B] focus:outline-none focus:ring-2 focus:ring-[#00272B]"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-[#00272B]/30" />

          {/* Social Links */}
          <div className="space-y-3">
            <div className="text-sm text-[#00272B]">Social Links</div>

            {/* LinkedIn */}
            <div className="flex items-center gap-3">
              <div className="card flex h-11 w-11 items-center justify-center p-0">
                <img src={linkedinLogo} alt="LinkedIn" className="h-6 w-6 object-contain" />
              </div>
              <input
                type="url"
                placeholder="LinkedIn URL"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="h-11 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#00272B] focus:outline-none focus:ring-2 focus:ring-[#00272B]"
              />
            </div>

            {/* X / Twitter */}
            <div className="flex items-center gap-3">
              <div className="card flex h-11 w-11 items-center justify-center p-0">
                <img src={xLogo} alt="X" className="h-6 w-6 object-contain" />
              </div>
              <input
                type="url"
                placeholder="X URL"
                value={xUrl}
                onChange={(e) => setXUrl(e.target.value)}
                className="h-11 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#00272B] focus:outline-none focus:ring-2 focus:ring-[#00272B]"
              />
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-3">
              <div className="card flex h-11 w-11 items-center justify-center p-0">
                <img src={instagramLogo} alt="Instagram" className="h-6 w-6 object-contain" />
              </div>
              <input
                type="url"
                placeholder="Instagram URL"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="h-11 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#00272B] focus:outline-none focus:ring-2 focus:ring-[#00272B]"
              />
            </div>

            {/* Facebook */}
            <div className="flex items-center gap-3">
              <div className="card flex h-11 w-11 items-center justify-center p-0">
                <img src={facebookLogo} alt="Facebook" className="h-6 w-6 object-contain" />
              </div>
              <input
                type="url"
                placeholder="Facebook URL"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="h-11 flex-1 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#00272B] focus:outline-none focus:ring-2 focus:ring-[#00272B]"
              />
            </div>
          </div>

          {/* Actions */}
          <PrimaryButton label="Save Updates" className="w-full" onClick={handleSave} />
        </form>
      </div>

      {/* Right column: live preview card (hidden on mobile) */}
      <div className="hidden lg:block space-y-7 bg-white rounded-2xl p-4">
        <BrandHero person={person} avatarUrl={avatarUrl} heightClass="h-96 lg:h-[26rem]" />
        <ContactsPanel person={person} />
        <SocialIcons />
      </div>
    </div>
  )
}