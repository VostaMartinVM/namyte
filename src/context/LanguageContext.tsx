import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react"

export type Language = "cs" | "en" | "de"

const STORAGE_KEY = "namyte-language"

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "cs",
  setLanguage: () => undefined,
})

const readStoredLanguage = (): Language => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === "en" || stored === "de" || stored === "cs" ? stored : "cs"
}

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(readStoredLanguage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
