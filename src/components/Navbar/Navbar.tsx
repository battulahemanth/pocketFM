
import { useState } from 'react'
import { FiBookOpen, FiCompass, FiHome, FiSearch, FiUser, FiGlobe } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import './Navbar.css'

type NavbarProps = {
  onOpenProfile?: () => void
  profileName?: string
}

const navItems = [
  {
    label: 'Home',
    icon: FiHome,
    active: true,
  },
  {
    label: 'Explore',
    icon: FiCompass,
  },
  {
    label: 'Library',
    icon: FiBookOpen,
  },
]

const languages = [
  'English',
  'Telugu',
  'Hindi',
  'Tamil',
  'Kannada',
  'Malayalam',
  'Bengali',
  'Marathi',
]

function Navbar({ onOpenProfile, profileName = 'Profile' }: NavbarProps) {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeRole, setActiveRole] = useState<'user' | 'admin'>('user')

  const handleProfileClick = () => {
    if (onOpenProfile) {
      onOpenProfile()
    }

    setIsMenuOpen((prev) => !prev)
  }

  const handleRoleSelect = (role: 'user' | 'admin') => {
    setActiveRole(role)
    setIsMenuOpen(false)

    if (role === 'admin') {
      navigate('/admin')
      return
    }

    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <div className="navbar__logo">OS</div>
        <div className="navbar__title">Our Stories</div>
      </div>

      <div className="navbar__links">
        {navItems.map(({ label, icon: Icon, active }) => (
          <a key={label} href="#" className={`navbar__link ${active ? 'is-active' : ''}`}>
            <Icon size={18} />
            <span>{label}</span>
          </a>
        ))}
      </div>

      <div className="navbar__right">
        <div className="navbar__search">
          <FiSearch size={18} />
          <input type="text" placeholder="Search stories" aria-label="Search stories" />
        </div>

        <div className="navbar__language">
          <FiGlobe size={18} />
          <select className="navbar__language-select" defaultValue="English" aria-label="Select story language">
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div className="navbar__actions">
          <div className="navbar__profile-wrapper">
            <button
              className="navbar__profile"
              type="button"
              aria-label="Profile menu"
              aria-expanded={isMenuOpen}
              onClick={handleProfileClick}
            >
              <FiUser size={18} />
              <span>{profileName === 'Profile' ? activeRole === 'admin' ? 'Admin' : 'User' : profileName}</span>
            </button>

            {isMenuOpen && (
              <div className="navbar__profile-menu">
                <button type="button" className="navbar__menu-item" onClick={() => handleRoleSelect('admin')}>
                  Admin
                </button>
                <button type="button" className="navbar__menu-item" onClick={() => handleRoleSelect('user')}>
                  User
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
