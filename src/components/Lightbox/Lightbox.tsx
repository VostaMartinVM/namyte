import { FC, useCallback, useEffect, useState } from "react"
import { IoChevronBack, IoChevronForward, IoClose } from "react-icons/io5"
import { GalleryPicture } from "../../types"
import "./Lightbox.scss"

type LightboxProps = {
  pictures: GalleryPicture[]
  startId: number
  onClose: () => void
}

const Lightbox: FC<LightboxProps> = ({ pictures, startId, onClose }) => {
  const startIndex = Math.max(
    pictures.findIndex((picture) => picture.id === startId),
    0,
  )
  const [currentIndex, setCurrentIndex] = useState(startIndex)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((index) => (index === 0 ? pictures.length - 1 : index - 1))
  }, [pictures.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((index) => (index === pictures.length - 1 ? 0 : index + 1))
  }, [pictures.length])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft") goToPrevious()
      if (event.key === "ArrowRight") goToNext()
    }
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [goToNext, goToPrevious, onClose])

  const currentPicture = pictures[currentIndex]

  return (
    <div className='lightbox' onClick={onClose}>
      <button className='lightboxClose' aria-label='Close' onClick={onClose}>
        <IoClose />
      </button>

      <button
        className='lightboxArrow left'
        aria-label='Previous'
        onClick={(event) => {
          event.stopPropagation()
          goToPrevious()
        }}
      >
        <IoChevronBack />
      </button>

      {currentPicture && (
        <img
          className='lightboxImage'
          src={currentPicture.src}
          alt=''
          onClick={(event) => event.stopPropagation()}
        />
      )}

      <button
        className='lightboxArrow right'
        aria-label='Next'
        onClick={(event) => {
          event.stopPropagation()
          goToNext()
        }}
      >
        <IoChevronForward />
      </button>

      <div className='lightboxCounter'>
        {currentIndex + 1} / {pictures.length}
      </div>
    </div>
  )
}

export default Lightbox
