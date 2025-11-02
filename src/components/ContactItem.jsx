export default function ContactItem({ icon, label, href, sub }) {
  const content = (
    <div className="flex items-start gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full text-gray-700">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-800">{label}</div>
        {sub && <div className="text-xs text-gray-500">{sub}</div>}
      </div>
    </div>
  )

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a href={href} className="block" target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined}>
        {content}
      </a>
    )
  }
  return content
}