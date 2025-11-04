import { useState } from 'react'
import { useAuth } from '../../utils/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { nameToSlug } from '../../utils/slug'
import PrimaryButton from '../../components/PrimaryButton'
import brandImg from '../../assets/Frame 16.png'

export default function StaffEmailPage() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState('email') // 'email' | 'verify'
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const { requestOtp, verifyOtp, profile } = useAuth()
  const navigate = useNavigate()

  const handleRequestOtp = async (e) => {
    e.preventDefault()
    try {
      await requestOtp(email)
      setOtpSent(true)
      setStep('verify')
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to send OTP'
      alert(msg)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    try {
      setIsVerifying(true)
      await verifyOtp(email, otp)
      const name = profile?.fullName || 'your-profile'
      const slug = nameToSlug(name)
      navigate(`/staff/update/${slug}`)
    } catch (err) {
      const msg = err?.response?.data?.message || 'Invalid or expired OTP'
      alert(msg)
    } finally {
      setIsVerifying(false)
    }
  }

  const resendCode = (e) => {
    e.preventDefault()
    // TODO: Integrate resend code API
    console.log('Resending code for OTP')
    alert('Resent code to your email')
  }

  return (
    <div className="space-y-6 lg:rounded-2xl lg:bg-white lg:p-4 lg:shadow-sm">
      {/* Brand header */}
      <div className="flex items-center gap-2">
        <img src={brandImg} alt="OneAfrica Markets" className="h-6 w-auto" />
      </div>
      {otpSent && (
        <div role="alert" className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
          OTP sent successfully to <span className="font-medium">{email}</span>. Check your inbox for the code.
        </div>
      )}
      {step === 'email' ? (
        <>
          {/* Heading */}
          <h1 className="text-2xl font-medium text-[#00272B]">Access Your OA Digital ID</h1>

          {/* Email Form */}
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <label htmlFor="staff-email" className="block text-sm text-[#00272B]">
              Staff Email
            </label>
            <input
              id="staff-email"
              type="email"
              required
              placeholder="Staff Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#00272B] focus:outline-none focus:ring-1 focus:ring-[#00272B]"
            />

            <PrimaryButton label="Request OTP" className="w-full" onClick={handleRequestOtp} />
          </form>
        </>
      ) : (
        <>
          {/* Back to email step */}
          <button type="button" onClick={() => setStep('email')} className="inline-flex items-center gap-1 text-[#00272B]" aria-label="Back">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span>Back</span>
          </button>

          {/* Heading */}
          <h1 className="text-2xl font-medium text-[#00272B]">Verify Your Identity</h1>

          {/* Verify Form */}
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <label htmlFor="otp" className="block text-sm text-[#00272B]">
              OTP
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#00272B] focus:outline-none focus:ring-1 focus:ring-[#00272B]"
            />

            <div className="text-sm text-gray-600">
              Didn’t receive the code?{' '}
              <button type="button" onClick={resendCode} className="underline text-[#00272B]">
                Resend Code
              </button>
            </div>

            <PrimaryButton label="Continue" className="w-full" onClick={handleVerifyOtp} loading={isVerifying} />
          </form>
        </>
      )}
    </div>
  )
}