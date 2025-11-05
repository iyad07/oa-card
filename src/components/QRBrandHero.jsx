
import SmileyIcon from '../icons/SmileyIcon'
import QRCode from 'react-qr-code'
import { nameToSlug } from '../utils/slug'

export default function QRBrandHero({ person, avatarUrl, onBackClick, qrImageUrl }) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-sm ">
      <div className="relative bg-[#F3F8F8] h-96 ">
        {/* Hero layer now fully uses image background */}
        <div className="absolute top-0 left-0 right-0 h-[80%] rounded-2xl overflow-hidden">
          <div className="h-full w-full grid place-items-center bg-white">
            <div className="rounded-xl p-4 bg-white">
              {qrImageUrl ? (
                <img
                  src={qrImageUrl}
                  alt="QR code"
                  className="block"
                  style={{ height: 'auto', width: '100%', maxWidth: 256 }}
                />
              ) : (
                <QRCode
                  value={`${window.location.origin}/${nameToSlug(person.name)}`}
                  size={224}
                  bgColor="#ffffff"
                  fgColor="#00272B"
                  level="M"
                  style={{ height: 'auto', width: '100%', maxWidth: 256 }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Identity strip merged into the card */}
        <div className="absolute bottom-0 left-0 right-0 z-0 bg-[#F3F8F8] py-3 px-4 h-[20%] ">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-between">
              <div className="text-[20px] text-gray-900">{person.name}</div>
              <div className="text-[14px] text-gray-600">{person.title} | {person.location}</div>
            </div>
            <button type="button" onClick={onBackClick} className="text-gray-600" aria-label="Back to card page">
              <SmileyIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}