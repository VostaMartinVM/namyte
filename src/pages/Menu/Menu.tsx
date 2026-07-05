import { FC, useEffect, useState } from "react"
import PageTransition from "../../components/PageTransition/PageTransition"
import { getMenuPictures, getMenuTranslations } from "../../services/api"
import { useLanguage } from "../../context/LanguageContext"
import { ui } from "../../i18n/ui"
import { TranslatedDoc } from "../../types"
import "./Menu.scss"

type MenuPicture = {
  name: string | undefined
  url: string
}

// [Firestore header key, Firestore item-key prefix, Czech fallback title]
const CATEGORIES: [string, string, string][] = [
  ["header1", "Predkrm", "Předkrmy"],
  ["header2", "BezmasaJidla", "Bezmasá jídla"],
  ["header3", "Maso", "Maso"],
  ["header4", "KureciMaso", "Kuřecí maso"],
  ["header5", "Ryby", "Ryby"],
  ["header6", "NaseSpeciality", "Naše speciality"],
  ["header7", "Prilohy", "Přílohy"],
  ["header8", "Omacky", "Omáčky"],
  ["header9", "SalatyMoucniky", "Saláty a moučníky"],
]

const fileNameFromUrl = (url: string): string | undefined => {
  const lastSegment = decodeURIComponent(url).split("/").pop()
  return lastSegment?.split("?")[0]
}

const Menu: FC = () => {
  const { language } = useLanguage()
  const [translations, setTranslations] = useState<TranslatedDoc>()
  const [pictures, setPictures] = useState<MenuPicture[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedTranslations, pictureUrls] = await Promise.all([
          getMenuTranslations(),
          getMenuPictures(),
        ])
        setTranslations(fetchedTranslations)
        setPictures(pictureUrls.map((url) => ({ name: fileNameFromUrl(url), url })))
      } catch (error) {
        console.error("Error fetching menu data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const renderSkeletons = () =>
    CATEGORIES.slice(0, 4).map(([headerKey, , fallbackTitle]) => (
      <section key={headerKey} className='menuCategory'>
        <h2 className='menuCategoryTitle'>{fallbackTitle}</h2>
        <div className='menuGrid'>
          {[...Array(4)].map((_, index) => (
            <div key={index} className='menuItemSkeleton skeleton' />
          ))}
        </div>
      </section>
    ))

  const renderCategories = () => {
    if (!translations) return null
    const output = translations.translated_output

    return CATEGORIES.map(([headerKey, keyPrefix, fallbackTitle]) => {
      const itemKeys = Object.keys(output)
        .filter((key) => key.startsWith(keyPrefix))
        .sort()

      if (itemKeys.length === 0) return null

      return (
        <section key={headerKey} className='menuCategory'>
          <h2 className='menuCategoryTitle'>{output[headerKey]?.[language] ?? fallbackTitle}</h2>
          <div className='menuGrid'>
            {itemKeys.map((itemKey) => {
              const picture = pictures.find((p) => p.name === `${itemKey}.jpg`)
              return (
                <article key={itemKey} className={picture ? "menuItem card" : "menuItem card textOnly"}>
                  {picture && <img src={picture.url} alt='' loading='lazy' />}
                  <p>{output[itemKey]?.[language]}</p>
                </article>
              )
            })}
          </div>
        </section>
      )
    })
  }

  return (
    <PageTransition>
      <div className='section'>
        <h1 className='sectionTitle'>{ui.menu.title[language]}</h1>
        <p className='sectionSubtitle'>{ui.menu.subtitle[language]}</p>
        {isLoading ? renderSkeletons() : renderCategories()}
      </div>
    </PageTransition>
  )
}

export default Menu
