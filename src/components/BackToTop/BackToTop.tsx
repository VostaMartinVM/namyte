import { FC, useEffect, useState } from "react"
import { IoIosArrowUp } from "react-icons/io"
import "./BackToTop.scss"

const SHOW_AFTER_PX = 400

const BackToTop: FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      className='backToTop'
      aria-label='Back to top'
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <IoIosArrowUp />
    </button>
  )
}

export default BackToTop
