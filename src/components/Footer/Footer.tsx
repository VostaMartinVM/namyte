import { FC } from "react"
import { Link } from "react-router-dom"
import { FaMapMarkerAlt, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa"
import { useLanguage } from "../../context/LanguageContext"
import { ui } from "../../i18n/ui"
import "./Footer.scss"

const Footer: FC = () => {
  const { language } = useLanguage()

  return (
    <footer className='footer'>
      <div className='footerInner'>
        <div className='footerColumn footerBrand'>
          <h3>Penzion a Restaurace Na Mýtě</h3>
          <p>{ui.home.heroSubtitle[language]}</p>
        </div>

        <div className='footerColumn'>
          <h4>{ui.contact.title[language]}</h4>
          <p>
            <FaMapMarkerAlt /> Na Mýtě 123, 391 01 Sezimovo Ústí
          </p>
          <p>
            <FaPhoneAlt /> <a href='tel:+420381214730'>381 214 730</a>
          </p>
          <p>
            <FaRegEnvelope />{" "}
            <a href='mailto:penzion-namyte@seznam.cz'>penzion-namyte@seznam.cz</a>
          </p>
        </div>

        <div className='footerColumn'>
          <h4>{ui.nav.menu[language]}</h4>
          <p>
            <Link to='/menu'>{ui.menu.title[language]}</Link>
          </p>
          <p>
            <Link to='/rooms'>{ui.rooms.title[language]}</Link>
          </p>
          <p>
            <Link to='/gallery'>{ui.gallery.title[language]}</Link>
          </p>
        </div>
      </div>
      <div className='footerBottom'>
        © {new Date().getFullYear()} Penzion Na Mýtě a restaurace s.r.o.
      </div>
    </footer>
  )
}

export default Footer
