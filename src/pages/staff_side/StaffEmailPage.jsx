import { useState } from 'react'
import { useAuth } from '../../utils/AuthContext.jsx'
import PrimaryButton from '../../components/PrimaryButton'
import brandImg from '../../assets/Frame 16.png'

export default function StaffEmailPage() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState('email') // 'email' | 'verify'
  const [otp, setOtp] = useState('')
  const { login } = useAuth()

  const requestOtp = (e) => {
    e.preventDefault()
    // TODO: Integrate with OTP request API
    console.log('Requesting OTP for:', email)
    alert(`OTP request sent to: ${email || 'your email'}`)
    setStep('verify')
  }

  const verifyOtp = (e) => {
    e.preventDefault()
    // TODO: Integrate OTP verification API
    console.log('Verifying OTP:', otp)
    alert(`Verifying OTP: ${otp || '(empty)'}`)
    // Mark user as verified/authenticated upon successful OTP verification
    login()
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
      {step === 'email' ? (
        <>
          {/* Heading */}
          <h1 className="text-2xl font-medium text-[#00272B]">Access Your OA Digital ID</h1>

          {/* Email Form */}
          <form onSubmit={requestOtp} className="space-y-4">
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
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#00272B] focus:outline-none focus:ring-2 focus:ring-[#00272B]"
            />

            <PrimaryButton label="Request OTP" className="w-full" onClick={requestOtp} />
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
          <form onSubmit={verifyOtp} className="space-y-4">
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
              className="h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-[#00272B] focus:outline-none focus:ring-2 focus:ring-[#00272B]"
            />

            <div className="text-sm text-gray-600">
              Didn’t receive the code?{' '}
              <button type="button" onClick={resendCode} className="underline text-[#00272B]">
                Resend Code
              </button>
            </div>

            <PrimaryButton label="Continue" className="w-full" onClick={verifyOtp} />
          </form>
        </>
      )}
    </div>
  )
}