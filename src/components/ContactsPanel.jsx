import ContactItem from './ContactItem'
import IconPhone from '../icons/PhoneIcon'
import IconMail from '../icons/MailIcon'
import IconGlobe from '../icons/GlobeIcon'
import IconPin from '../icons/PinIcon'

export default function ContactsPanel({ person }) {
  return (
    <div className="rounded-2xl bg-white p-2 shadow-sm">
      <div className="space-y-1">
        <ContactItem icon={<IconPhone />} label={person.phone} href={`tel:${person.phone}`} />
        <ContactItem icon={<IconMail />} label={person.email} href={`mailto:${person.email}`} />
        <ContactItem icon={<IconGlobe />} label={person.website} href={`https://${person.website}`} />
        <ContactItem icon={<IconPin />} label={person.location} sub={person.address} />
      </div>
    </div>
  )
}