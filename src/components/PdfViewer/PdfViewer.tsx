import { FC, useEffect, useRef, useState } from "react"
import { Document, Page } from "react-pdf/dist/esm/entry.webpack"
import { useLanguage } from "../../context/LanguageContext"
import { ui } from "../../i18n/ui"
import "./PdfViewer.scss"

type PdfViewerProps = {
  url: string | undefined
  isLoading?: boolean
}

const PdfViewer: FC<PdfViewerProps> = ({ url, isLoading = false }) => {
  const { language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>()
  const [numPages, setNumPages] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth)
      }
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const renderPlaceholder = (text: string, asSkeleton: boolean) => (
    <div className={asSkeleton ? "pdfPlaceholder skeleton" : "pdfPlaceholder"}>{text}</div>
  )

  return (
    <div className='pdfViewer' ref={containerRef}>
      {!url
        ? renderPlaceholder(
            isLoading ? ui.common.loading[language] : ui.common.pdfUnavailable[language],
            isLoading,
          )
        : width && (
            <Document
              file={url}
              onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}
              loading={renderPlaceholder(ui.common.loading[language], true)}
              error={renderPlaceholder(ui.common.pdfUnavailable[language], false)}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={index}
                  pageNumber={index + 1}
                  width={width}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              ))}
            </Document>
          )}
    </div>
  )
}

export default PdfViewer
