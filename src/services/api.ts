import { doc, getDoc } from "firebase/firestore"
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from "firebase/storage"
import { db, storage } from "./firebase"
import { TranslatedDoc } from "../types"

// NOTE: Firestore document ids and Storage folder names are kept in their original
// (Czech) form because they refer to existing data on the server.

const TRANSLATION_COLLECTION = "translation_collection_path"

const getTranslationDoc = async (docId: string): Promise<TranslatedDoc | undefined> => {
  const snapshot = await getDoc(doc(db, TRANSLATION_COLLECTION, docId))
  return snapshot.data() as TranslatedDoc | undefined
}

export const getHomeTranslations = () => getTranslationDoc("homePage")
export const getMenuTranslations = () => getTranslationDoc("jidelniListek")
export const getRoomsTranslations = () => getTranslationDoc("ubytovani")
export const getGalleryTranslations = () => getTranslationDoc("galerie")
export const getActivitiesTranslations = () => getTranslationDoc("aktivity")
export const getContactTranslations = () => getTranslationDoc("oNas")

// Storage listings

const listFileUrls = async (folder: string): Promise<string[]> => {
  const listing = await listAll(ref(storage, folder))
  return Promise.all(listing.items.map((item) => getDownloadURL(item)))
}

export const getHomePictures = () => listFileUrls("HomePage/")
export const getMenuPictures = () => listFileUrls("JidelniListek/")
export const getRoomPictures = () => listFileUrls("Ubytovani/")
export const getWeddingPictures = () => listFileUrls("Svatby/")
export const getActivityPictures = () => listFileUrls("Aktivity/")
export const getDailyMenuPdfs = () => listFileUrls("DenniMenu/")
export const getWeekendMenuPdfs = () => listFileUrls("VikendoveMenu/")

// Admin: menu PDF management

const deleteFolderContents = async (folder: string) => {
  const listing = await listAll(ref(storage, folder))
  await Promise.all(listing.items.map((item) => deleteObject(item)))
}

const replacePdfInFolder = async (folder: string, pdf: File) => {
  await deleteFolderContents(folder)
  await uploadBytesResumable(ref(storage, `${folder}${pdf.name}`), pdf)
}

export const replaceDailyMenuPdf = (pdf: File) => replacePdfInFolder("DenniMenu/", pdf)
export const replaceWeekendMenuPdf = (pdf: File) => replacePdfInFolder("VikendoveMenu/", pdf)
