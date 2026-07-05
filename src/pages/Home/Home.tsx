import { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MdOutlineRestaurantMenu } from "react-icons/md"
import { FaBed } from "react-icons/fa6"
import PageTransition from "../../components/PageTransition/PageTransition"
import ImageSlider from "../../components/ImageSlider/ImageSlider"
import PdfViewer from "../../components/PdfViewer/PdfViewer"
import {
  getDailyMenuPdfs,
  getHomePictures,
  getHomeTranslations,
  getWeekendMenuPdfs,
} from "../../services/api"
import { useLanguage } from "../../context/LanguageContext"
import { ui } from "../../i18n/ui"
import { TranslatedDoc } from "../../types"
import "./Home.scss"

const FALLBACK_INTRO =
  "Penzion a Restaurace Na Mýtě se nachází na okraji malého městečka Sezimovo Ústí, vzdáleného od Tábora pouhé 2 km. Nabízíme Vám ubytování v nadstandardně zařízených jedno, dvou a tří lůžkových pokojích s vlastním sociálním zařízením, LCD televizorem a internetovým připojením."

const Home: FC = () => {
  const { language } = useLanguage()
  const [translations, setTranslations] = useState<TranslatedDoc>()
  const [pictures, setPictures] = useState<string[]>()
  const [dailyMenuUrl, setDailyMenuUrl] = useState<string>()
  const [weekendMenuUrl, setWeekendMenuUrl] = useState<string>()
  const [isLoadingPdfs, setIsLoadingPdfs] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedTranslations, fetchedPictures, dailyPdfs, weekendPdfs] = await Promise.all([
          getHomeTranslations(),
          getHomePictures(),
          getDailyMenuPdfs(),
          getWeekendMenuPdfs(),
        ])
        setTranslations(fetchedTranslations)
        setPictures(fetchedPictures)
        setDailyMenuUrl(dailyPdfs[0])
        setWeekendMenuUrl(weekendPdfs[0])
      } catch (error) {
        console.error("Error fetching home page data:", error)
      } finally {
        setIsLoadingPdfs(false)
      }
    }
    fetchData()
  }, [])

  const introText = translations?.translated_output.introduction?.[language] ?? FALLBACK_INTRO
  const introParagraphs = introText
    .split("-----")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  const scrollToDailyMenu = () => {
    document.getElementById("daily-menu")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <PageTransition>
      <section className='hero'>
        <ImageSlider pictures={pictures} className='heroSlider' />
        <div className='heroOverlay' />
        <div className='heroContent'>
          <h1>Penzion a Restaurace Na Mýtě</h1>
          <p>{ui.home.heroSubtitle[language]}</p>
          <div className='heroActions'>
            <button className='btn btnPrimary' onClick={scrollToDailyMenu}>
              <MdOutlineRestaurantMenu />
              {ui.home.viewDailyMenu[language]}
            </button>
            <Link to='/rooms' className='btn btnGhost'>
              <FaBed />
              {ui.home.bookStay[language]}
            </Link>
          </div>
        </div>
      </section>

      <section className='section'>
        <h2 className='sectionTitle'>
          {translations?.translated_output.header?.[language] ?? ui.home.aboutTitle[language]}
        </h2>
        <div className='homeIntro'>
          {introParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className='section' id='daily-menu'>
        <h2 className='sectionTitle'>{ui.home.dailyMenuTitle[language]}</h2>
        <p className='sectionSubtitle'>{ui.home.dailyMenuNote[language]}</p>
        <div className='homeMenus'>
          <div className='homeMenuCard'>
            <h3>{ui.home.dailyMenuTitle[language]}</h3>
            <PdfViewer url={dailyMenuUrl} isLoading={isLoadingPdfs} />
          </div>
          {(isLoadingPdfs || weekendMenuUrl) && (
            <div className='homeMenuCard'>
              <h3>{ui.home.weekendMenuTitle[language]}</h3>
              <PdfViewer url={weekendMenuUrl} isLoading={isLoadingPdfs} />
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}

export default Home
