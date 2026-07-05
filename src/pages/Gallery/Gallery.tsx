import { FC, useEffect, useState } from "react"
import PageTransition from "../../components/PageTransition/PageTransition"
import Lightbox from "../../components/Lightbox/Lightbox"
import {
  getGalleryTranslations,
  getHomePictures,
  getRoomPictures,
  getWeddingPictures,
} from "../../services/api"
import { useLanguage } from "../../context/LanguageContext"
import { ui } from "../../i18n/ui"
import { GalleryPicture, TranslatedDoc } from "../../types"
import "./Gallery.scss"

type Section = GalleryPicture["section"]

// Firestore key of the section heading in the "galerie" translation document
const SECTIONS: { section: Section; translationKey: string }[] = [
  { section: "pension", translationKey: "Penzion" },
  { section: "rooms", translationKey: "Ubytovani" },
  { section: "weddings", translationKey: "Svatby" },
]

const Gallery: FC = () => {
  const { language } = useLanguage()
  const [translations, setTranslations] = useState<TranslatedDoc>()
  const [pictures, setPictures] = useState<GalleryPicture[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lightboxId, setLightboxId] = useState<number>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pensionPictures, roomPictures, weddingPictures, fetchedTranslations] =
          await Promise.all([
            getHomePictures(),
            getRoomPictures(),
            getWeddingPictures(),
            getGalleryTranslations(),
          ])

        const allPictures: GalleryPicture[] = [
          ...pensionPictures.map((src): Omit<GalleryPicture, "id"> => ({ src, section: "pension" })),
          ...roomPictures.map((src): Omit<GalleryPicture, "id"> => ({ src, section: "rooms" })),
          ...weddingPictures.map(
            (src): Omit<GalleryPicture, "id"> => ({ src, section: "weddings" }),
          ),
        ].map((picture, index) => ({ ...picture, id: index }))

        setTranslations(fetchedTranslations)
        setPictures(allPictures)
      } catch (error) {
        console.error("Error fetching gallery data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const renderSkeletons = () => (
    <div className='galleryGrid'>
      {[...Array(6)].map((_, index) => (
        <div key={index} className='gallerySkeleton skeleton' />
      ))}
    </div>
  )

  return (
    <PageTransition>
      <div className='section'>
        <h1 className='sectionTitle'>{ui.gallery.title[language]}</h1>

        {SECTIONS.map(({ section, translationKey }) => {
          const sectionPictures = pictures.filter((picture) => picture.section === section)
          if (!isLoading && sectionPictures.length === 0) return null

          return (
            <section key={section} className='gallerySection'>
              <h2 className='galleryHeading'>
                {translations?.translated_output[translationKey]?.[language] ??
                  ui.gallery[section][language]}
              </h2>
              {isLoading ? (
                renderSkeletons()
              ) : (
                <div className='galleryGrid'>
                  {sectionPictures.map((picture) => (
                    <button
                      key={picture.id}
                      className='galleryThumb'
                      onClick={() => setLightboxId(picture.id)}
                    >
                      <img src={picture.src} alt='' loading='lazy' />
                    </button>
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </div>

      {lightboxId !== undefined && (
        <Lightbox
          pictures={pictures}
          startId={lightboxId}
          onClose={() => setLightboxId(undefined)}
        />
      )}
    </PageTransition>
  )
}

export default Gallery
