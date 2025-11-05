import brandImg from '../assets/Frame 16.png'
import subtractBg from '../assets/Subtract (1).png'
import vectorImg from '../assets/Vector.png'
import IconQR from '../icons/QRIcon'

export default function BrandHero({ person, avatarUrl, heightClass = 'h-[19rem]', onQrClick }) {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-sm ">
      <div className={`relative bg-[#F3F8F8] ${heightClass}`}>
        {/* Hero layer now fully uses image background */}
        <div className="absolute top-0 left-0 right-0 h-[80%]  rounded-2xl overflow-hidden">
          <img
            src={subtractBg}
            alt=""
            className="absolute right-0 top-0 z-[10] h-full w-full object-fill pointer-events-none"
          />
          <div className="absolute top-0 right-0 h-[100%] flex items-center justify-center overflow-hidden z-[30]">
            <img src={avatarUrl} alt="Portrait" className="h-full w-full object-cover" />
          </div>
          <div className="absolute top-0 right-0 h-[100%] flex items-center justify-center overflow-hidden z-[20]">
            <img src={vectorImg} alt="Portrait" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="absolute inset-0 bg-white rounded-2xl w-[40%] h-[30%] ">
          <img
            src={brandImg}
            alt="brand"
            className=" absolute h-[50%] w-[70%] object-contain object-right-top pl-3 pt-3 "
          />
        </div>

        {/* Identity strip */}
        <div className="absolute bottom-0 left-0 right-0 z-0 bg-[#F3F8F8] py-1 px-4 h-[20%] ">
          <div className="flex items-center justify-between">
            <div className="flex flex-col justify-between">
              <div className="text-[20px] text-gray-900">{person.name}</div>
              <div className="text-[14px] text-gray-600">
                {person.title} | {person.location}
              </div>
            </div>
            <button
              type="button"
              onClick={onQrClick}
              className="text-gray-600"
              aria-label="Open QR card"
            >
              <IconQR />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
