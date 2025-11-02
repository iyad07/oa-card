import { useState } from 'react'
import PrimaryButton from '../../components/PrimaryButton'
import brandImg from '../../assets/Frame 16.png'

export default function StaffEmailPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder: integrate with OTP request API
    console.log('Requesting OTP for:', email)
    alert(`OTP request sent to: ${email || 'your email'}`)
  }

  return (
    <div className="space-y-6 lg:rounded-2xl lg:bg-white lg:p-4 lg:shadow-sm">
      {/* Brand header */}
      <div className="flex items-center gap-2">
        <img src={brandImg} alt="OneAfrica Markets" className="h-6 w-auto" />
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-medium text-[#00272B]">Access Your OA Digital ID</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <PrimaryButton label="Request OTP" className="w-full" onClick={handleSubmit} />
      </form>
    </div>
  )
}