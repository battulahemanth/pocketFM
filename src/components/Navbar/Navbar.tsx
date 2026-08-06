import { FiBookOpen, FiCompass, FiHome, FiSearch, FiUser } from 'react-icons/fi'
import './Navbar.css'

type NavbarProps = {
  onOpenProfile: () => void
  profileName: string
}

const navItems = [
  { label: 'Home', icon: FiHome, active: true },
  { label: 'Explore', icon: FiCompass },
  { label: 'Library', icon: FiBookOpen },
]

function Navbar({ onOpenProfile, profileName }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <div className="navbar__logo">OS</div>
        <span className="navbar__brand-text">Our_stories</span>
      </div>

      <div className="navbar__links">
        {navItems.map(({ label, icon: Icon, active }) => (
          <a key={label} href="#" className={`navbar__link ${active ? 'is-active' : ''}`}>
            <Icon size={18} />
            <span>{label}</span>
          </a>
        ))}
      </div>

      <div className="navbar__search">
        <FiSearch size={18} />
        <input type="text" placeholder="Search stories" aria-label="Search stories" />
      </div>

      <div className="navbar__actions">
        <button className="navbar__icon navbar__profile" type="button" aria-label="Profile" onClick={onOpenProfile}>
          <FiUser size={18} />
          <span>{profileName}</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
