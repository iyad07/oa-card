export default function SmileyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Corner brackets */}
      <path d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />

      {/* Smiley face in circle */}
      <circle cx="12" cy="12" r="6" />
      <circle cx="10" cy="11" r="1" />
      <circle cx="14" cy="11" r="1" />
      <path d="M9 14c1.5 1.2 3 1.6 3 1.6s1.5-.4 3-1.6" />
    </svg>
  )
}