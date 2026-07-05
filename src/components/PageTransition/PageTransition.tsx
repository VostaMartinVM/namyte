import { FC, ReactNode } from "react"
import { motion } from "framer-motion"
import "./PageTransition.scss"

const variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

type PageTransitionProps = {
  children: ReactNode
}

const PageTransition: FC<PageTransitionProps> = ({ children }) => (
  <motion.main
    className='page'
    variants={variants}
    initial='initial'
    animate='animate'
    exit='exit'
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.main>
)

export default PageTransition
