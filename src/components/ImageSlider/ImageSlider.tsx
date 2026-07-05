import { FC, useCallback, useEffect, useState } from "react"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"
import "./ImageSlider.scss"

const SLIDE_DURATION = 5000
const MAX_DOTS = 9

type ImageSliderProps = {
  pictures: string[] | undefined
  className?: string
  autoPlay?: boolean
}

const ImageSlider: FC<ImageSliderProps> = ({ pictures, className, autoPlay = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const count = pictures?.length ?? 0

  const goToPrevious = useCallback(() => {
    setCurrentIndex((index) => (count ? (index === 0 ? count - 1 : index - 1) : 0))
  }, [count])

  const goToNext = useCallback(() => {
    setCurrentIndex((index) => (count ? (index === count - 1 ? 0 : index + 1) : 0))
  }, [count])

  useEffect(() => {
    if (!autoPlay || count < 2) return
    const interval = setInterval(goToNext, SLIDE_DURATION)
    return () => clearInterval(interval)
  }, [autoPlay, count, goToNext])

  const currentImg = pictures?.[currentIndex]

  return (
    <div className={className ? `imageSlider ${className}` : "imageSlider"}>
      {currentImg ? (
        <img className='imageSliderImage' src={currentImg} alt='' />
      ) : (
        <div className='imageSliderSkeleton skeleton' />
      )}

      {count > 1 && (
        <>
          <button className='imageSliderArrow left' aria-label='Previous' onClick={goToPrevious}>
            <IoChevronBack />
          </button>
          <button className='imageSliderArrow right' aria-label='Next' onClick={goToNext}>
            <IoChevronForward />
          </button>

          <div className='imageSliderDots'>
            {pictures?.slice(0, MAX_DOTS).map((_, index) => (
              <button
                key={index}
                aria-label={`Slide ${index + 1}`}
                className={currentIndex === index ? "imageSliderDot active" : "imageSliderDot"}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ImageSlider
