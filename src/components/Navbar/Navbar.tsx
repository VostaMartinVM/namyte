import { FC, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { MdClose, MdMenu, MdOutlineSportsHandball, MdRestaurantMenu } from "react-icons/md"
import { FaImages, FaRegEnvelope } from "react-icons/fa"
import { FaBed } from "react-icons/fa6"
import { IoHomeOutline } from "react-icons/io5"
import { Language, useLanguage } from "../../context/LanguageContext"
import { ui } from "../../i18n/ui"
import "./Navbar.scss"

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "cs", label: "CZ" },
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
]

const Navbar: FC = () => {
  const { language, setLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: "/", label: ui.nav.home[language], icon: <IoHomeOutline /> },
    { to: "/menu", label: ui.nav.menu[language], icon: <MdRestaurantMenu /> },
    { to: "/rooms", label: ui.nav.rooms[language], icon: <FaBed /> },
    { to: "/gallery", label: ui.nav.gallery[language], icon: <FaImages /> },
    { to: "/activities", label: ui.nav.activities[language], icon: <MdOutlineSportsHandball /> },
    { to: "/contact", label: ui.nav.contact[language], icon: <FaRegEnvelope /> },
  ]

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className='navbar'>
      <div className='navbarInner'>
        <Link to='/' className='navbarBrand' onClick={closeMenu}>
          <img src='/logo.png' alt='Penzion a Restaurace Na Mýtě' />
        </Link>

        <nav className={menuOpen ? "navbarLinks open" : "navbarLinks"}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "navbarLink active" : "navbarLink")}
            >
              <span className='navbarLinkIcon'>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}

          <div className='navbarLanguages'>
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                className={language === code ? "languageButton active" : "languageButton"}
                onClick={() => {
                  setLanguage(code)
                  closeMenu()
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        <button
          className='navbarToggle'
          aria-label='Menu'
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>
    </header>
  )
}

export default Navbar
