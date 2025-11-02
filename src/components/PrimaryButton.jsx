export default function PrimaryButton({ label = 'Save Contact', onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-primary flex-1 justify-center bg-[#00272B] font-normal h-11 hover:bg-[#01444A] ${className}`}
    >
      {label}
    </button>
  )
}