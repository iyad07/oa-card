import brandImg from '../assets/Frame 16.png'
import PrimaryButton from '../components/PrimaryButton'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 lg:rounded-2xl lg:bg-white lg:p-4 lg:shadow-sm">
      {/* Brand header */}
      <div className="flex items-center gap-2">
        <img src={brandImg} alt="OneAfrica Markets" className="h-6 w-auto" />
      </div>

      {/* Message card */}
      <div className="card space-y-3">
        <h1 className="text-3xl font-medium text-[#00272B]">Page not found</h1>
        <p className="text-sm text-gray-600">
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <div className="flex items-center gap-3">
          <PrimaryButton label="Go to Staff" onClick={() => navigate('/staff')} />
          <button
            type="button"
            className="btn flex-1 h-11 border border-gray-200 bg-white text-[#00272B] hover:bg-gray-100"
            onClick={() => navigate('/')}
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  )
}