import { FiBookOpen, FiCompass, FiHome, FiSearch, FiUser } from 'react-icons/fi'

const navItems = [
  { label: 'Home', icon: FiHome, active: true },
  { label: 'Explore', icon: FiCompass },
  { label: 'Library', icon: FiBookOpen },
]

function Navbar() {
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

      <div className="navbar__actions">
        <button className="navbar__icon" type="button" aria-label="Search">
          <FiSearch size={18} />
        </button>
        <button className="navbar__icon" type="button" aria-label="Profile">
          <FiUser size={18} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
