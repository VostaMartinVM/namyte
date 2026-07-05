import { FC, useEffect, useState } from "react"
import { FaMapMarkerAlt, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa"
import PageTransition from "../../components/PageTransition/PageTransition"
import { getContactTranslations } from "../../services/api"
import { useLanguage } from "../../context/LanguageContext"
import { ui } from "../../i18n/ui"
import { TranslatedDoc } from "../../types"
import "./Contact.scss"

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1836.7068683466568!2d14.691893502868028!3d49.38061736407571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470cbd3c7b9e3ed3%3A0xf1e10289df974a6c!2sPenzion%20-%20Restaurace%20Na%20M%C3%BDt%C4%9B!5e0!3m2!1sen!2sdk!4v1680965326444!5m2!1sen!2sdk"

const FALLBACK = {
  phoneLabel: "tel.:",
  phoneNote: "- Ubytování, rezervace a restaurace",
  registerNote: "Spisová značka firmy C 25376 vedená u krajského soudu v Českých Budějovicích",
  emailLabel: "E-mailem:",
  backupIntro: "V případě, že se nedovoláte na pevnou linku",
  backupLabel: "Auto:",
}

const Contact: FC = () => {
  const { language } = useLanguage()
  const [translations, setTranslations] = useState<TranslatedDoc>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTranslations(await getContactTranslations())
      } catch (error) {
        console.error("Error fetching contact data:", error)
      }
    }
    fetchData()
  }, [])

  const output = translations?.translated_output

  return (
    <PageTransition>
      <div className='section'>
        <h1 className='sectionTitle'>{ui.contact.title[language]}</h1>
        <p className='sectionSubtitle'>Penzion Na Mýtě a restaurace s.r.o.</p>

        <div className='contactGrid'>
          <div className='contactMap'>
            <iframe
              title='Penzion Na Mýtě map'
              src={MAP_EMBED_URL}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              allowFullScreen
            />
          </div>

          <div className='contactCard'>
            <div className='contactItem'>
              <FaMapMarkerAlt />
              <div>
                Na Mýtě 123
                <br />
                391 01 Sezimovo Ústí 1
              </div>
            </div>

            <div className='contactItem'>
              <FaPhoneAlt />
              <div>
                {output?.p3?.[language] ?? FALLBACK.phoneLabel}{" "}
                <a href='tel:+420381214730'>
                  <b>381 214 730</b>
                </a>{" "}
                {output?.p4?.[language] ?? FALLBACK.phoneNote}
              </div>
            </div>

            <div className='contactItem'>
              <FaRegEnvelope />
              <div>
                {output?.p6?.[language] ?? FALLBACK.emailLabel}{" "}
                <a href='mailto:penzion-namyte@seznam.cz'>
                  <b>penzion-namyte@seznam.cz</b>
                </a>
              </div>
            </div>

            <div className='contactLegal'>
              IČO: 05518385
              <br />
              {output?.p5?.[language] ?? FALLBACK.registerNote}
            </div>

            <div className='contactBackup'>
              {output?.p7?.[language] ?? FALLBACK.backupIntro}
              <br />
              {output?.p8?.[language] ?? FALLBACK.backupLabel} <b>777 203 741</b> - Pavel Růžička
              (10-18)
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Contact
