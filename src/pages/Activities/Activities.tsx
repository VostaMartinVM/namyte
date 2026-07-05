import { FC, useEffect, useState } from "react"
import { FiExternalLink } from "react-icons/fi"
import PageTransition from "../../components/PageTransition/PageTransition"
import { getActivitiesTranslations, getActivityPictures } from "../../services/api"
import { useLanguage } from "../../context/LanguageContext"
import { ui } from "../../i18n/ui"
import { TranslatedDoc } from "../../types"
import "./Activities.scss"

const ACTIVITY_LINKS = [
  "https://www.visittabor.eu/co-delat-v-tabore",
  "https://www.koupalistepohoda.cz",
  "https://tenissezimak.cz",
  "https://www.visittabor.eu/kalendar-akci",
]

const Activities: FC = () => {
  const { language } = useLanguage()
  const [translations, setTranslations] = useState<TranslatedDoc>()
  const [pictures, setPictures] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedTranslations, fetchedPictures] = await Promise.all([
          getActivitiesTranslations(),
          getActivityPictures(),
        ])
        setTranslations(fetchedTranslations)
        setPictures(fetchedPictures)
      } catch (error) {
        console.error("Error fetching activities data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const output = translations?.translated_output

  return (
    <PageTransition>
      <div className='section'>
        <h1 className='sectionTitle'>{ui.activities.title[language]}</h1>

        <div className='activitiesList'>
          {ACTIVITY_LINKS.map((link, index) => (
            <article key={link} className='activityRow'>
              <a
                className='activityImage'
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                tabIndex={-1}
              >
                {isLoading || !pictures[index] ? (
                  <div className='activitySkeleton skeleton' />
                ) : (
                  <img src={pictures[index]} alt='' loading='lazy' />
                )}
              </a>
              <div className='activityContent'>
                <h2>{output?.[`title${index + 1}`]?.[language]}</h2>
                <p>{output?.[`text${index + 1}`]?.[language]}</p>
                <a className='btn btnDark' href={link} target='_blank' rel='noopener noreferrer'>
                  <FiExternalLink />
                  {ui.activities.visitWebsite[language]}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}

export default Activities
