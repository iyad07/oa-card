import brandImg from '../assets/Frame 16.png'
import subtractBg from '../assets/Subtract (1).png'
import vectorImg from '../assets/Vector.png'
import IconQR from '../icons/QRIcon'
import { Link } from 'react-router-dom'

export default function BrandHero({ person, avatarUrl, heightClass = 'h-96' }) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-sm ">
      <div className={`relative bg-[#F3F8F8] ${heightClass}`}>
        {/* Hero layer now fully uses image background */}
        <div className="absolute top-0 left-0 right-0 h-[80%]  rounded-2xl overflow-hidden">
          {/* White container behind subtractBg */}
          <div className="absolute inset-0 bg-white rounded-2xl w-[40%] h-[30%] ">
            <img
              src={brandImg}
              alt="brand"
              className="h-[50%] w-[70%] object-fill object-right-top pl-2 pt-5"
            />
          </div>
          <img
            src={subtractBg}
            alt="Portrait"
            className="relative h-full w-full object-fill z-10"
          />
          {/* Decorative vector above background, below avatar */}
          <img
            src={vectorImg}
            alt="Decorative vector"
            className="absolute right-0 bottom-0 z-[15] top-0 object-fill pointer-events-none"
          />
          <div className="absolute top-0 right-0 z-20 h-[100%] flex items-center justify-center overflow-hidden">
            <img
              src={avatarUrl}
              alt="Portrait"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Identity strip merged into the card */}
        <div className="absolute bottom-0 left-0 right-0 z-0 bg-[#F3F8F8] py-3 px-4 h-[20%] ">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-between">
              <div className="text-[20px] text-gray-900">{person.name}</div>
              <div className="text-[14px] text-gray-600">{person.title} | {person.location}</div>
            </div>
            <Link to="/qr" className="text-gray-600" aria-label="Open QR card">
              <IconQR />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}