
import {
  FiBookOpen,
  FiCompass,
  FiHome,
  FiSearch,
  FiUser,
  FiGlobe,
  FiChevronDown,
} from 'react-icons/fi'

import './Navbar.css'

type NavbarProps = {
  onOpenProfile: () => void
  profileName: string
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

function Navbar({
  onOpenProfile,
  profileName,
}: NavbarProps) {
  return (
    <nav className="navbar">

      {/* =========================
          LEFT - LOGO
      ========================== */}

      <div className="navbar__brand">
        <div className="navbar__logo">
          OS
        </div>

        <div className="navbar__title">
          Our Stories
        </div>
      </div>


      {/* =========================
          CENTER - NAVIGATION
      ========================== */}

      <div className="navbar__links">

        {navItems.map(
          ({ label, icon: Icon, active }) => (
            <a
              key={label}
              href="#"
              className={`navbar__link ${
                active ? 'is-active' : ''
              }`}
            >
              <Icon size={18} />

              <span>
                {label}
              </span>
            </a>
          )
        )}

      </div>


      {/* =========================
          RIGHT SIDE
      ========================== */}

      <div className="navbar__right">

        {/* SEARCH */}

        <div className="navbar__search">

          <FiSearch size={18} />

          <input
            type="text"
            placeholder="Search stories"
            aria-label="Search stories"
          />

        </div>


        {/* LANGUAGE */}

        <div className="navbar__language">

          <FiGlobe size={18} />

          <select
            className="navbar__language-select"
            defaultValue="English"
            aria-label="Select story language"
          >

            {languages.map((language) => (
              <option
                key={language}
                value={language}
              >
                {language}
              </option>
            ))}

          </select>

        </div>


        {/* PROFILE */}

        <div className="navbar__actions">

          <button
            className="navbar__profile"
            type="button"
            aria-label="Profile"
            onClick={onOpenProfile}
          >

            <FiUser size={18} />

            <span>
              {profileName}
            </span>

          </button>

        </div>

      </div>

    </nav>
  )
}

export default Navbar
