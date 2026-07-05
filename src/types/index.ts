// Shape of the documents in the Firestore translation collection:
// every key inside translated_output maps to { cs, en, de } strings.
export type TranslatedText = Record<string, string>

export type TranslatedDoc = {
  // eslint-disable-next-line camelcase
  translated_output: Record<string, TranslatedText>
}

export type GalleryPicture = {
  id: number
  src: string
  section: "pension" | "rooms" | "weddings"
}
