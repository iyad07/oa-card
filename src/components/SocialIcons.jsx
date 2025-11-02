import linkedinLogo from '../assets/ph_linkedin-logo.png'
import xLogo from '../assets/ph_x-logo.png'
import instagramLogo from '../assets/ph_instagram-logo.png'
import facebookLogo from '../assets/ph_facebook-logo.png'

export default function SocialIcons() {
  return (
    <div className="flex items-center justify-between py-2 text-gray-700">
      <button className="rounded-lg " aria-label="LinkedIn">
        <img src={linkedinLogo} alt="LinkedIn" className="h-[35px] w-[35px] object-contain" />
      </button>
      <button className="rounded-lg " aria-label="X">
        <img src={xLogo} alt="X" className="h-[35px] w-[35px] object-contain" />
      </button>
      <button className="rounded-lg" aria-label="Instagram">
        <img src={instagramLogo} alt="Instagram" className="h-[35px] w-[35px] object-contain" />
      </button>
      <button className="rounded-lg" aria-label="Facebook">
        <img src={facebookLogo} alt="Facebook" className="h-[35px] w-[35px] object-contain" />
      </button>
    </div>
  )
}