import { FC, useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa"
import { TbBrandBooking } from "react-icons/tb"
import PageTransition from "../../components/PageTransition/PageTransition"
import ImageSlider from "../../components/ImageSlider/ImageSlider"
import { getRoomPictures, getRoomsTranslations } from "../../services/api"
import { useLanguage } from "../../context/LanguageContext"
import { BOOKING_URL, ui } from "../../i18n/ui"
import { TranslatedDoc } from "../../types"
import "./Rooms.scss"

const FALLBACK_INFO = [
  "Nabízíme ubytování v pokojích po jednom, dvou a tří lůžkách",
  "Každý pokoj je vybaven vlastním sociálním zařízením a LCD televizorem",
  "V celé budově je dostupný internet",
  "Soukromé parkoviště se na noc uzamyká",
  "Nabízíme i možnost přistýlky",
]

const PRICE = "890 Kč"

const Rooms: FC = () => {
  const { language } = useLanguage()
  const [pictures, setPictures] = useState<string[]>()
  const [translations, setTranslations] = useState<TranslatedDoc>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedPictures, fetchedTranslations] = await Promise.all([
          getRoomPictures(),
          getRoomsTranslations(),
        ])
        setPictures(fetchedPictures)
        setTranslations(fetchedTranslations)
      } catch (error) {
        console.error("Error fetching rooms data:", error)
      }
    }
    fetchData()
  }, [])

  const output = translations?.translated_output

  // info2 holds the price sentence; the remaining infos are the feature list
  const features = output
    ? ["info1", "info3", "info4", "info5", "info6"]
        .map((key) => output[key]?.[language])
        .filter(Boolean)
    : FALLBACK_INFO

  return (
    <PageTransition>
      <div className='section'>
        <h1 className='sectionTitle'>{output?.header1?.[language] ?? ui.rooms.title[language]}</h1>

        <div className='roomsSlider'>
          <ImageSlider pictures={pictures} />
        </div>

        <div className='roomsContent'>
          <ul className='roomsFeatures'>
            {features.map((feature, index) => (
              <li key={index}>
                <FaCheck />
                {feature}
              </li>
            ))}
          </ul>

          <aside className='roomsPriceCard'>
            <div className='roomsPrice'>{PRICE}</div>
            <p>{output?.info2?.[language] ?? ui.rooms.priceLabel[language]}</p>
            <a
              className='btn btnPrimary'
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'
            >
              <TbBrandBooking />
              {ui.rooms.bookNow[language]}
            </a>
          </aside>
        </div>
      </div>
    </PageTransition>
  )
}

export default Rooms
