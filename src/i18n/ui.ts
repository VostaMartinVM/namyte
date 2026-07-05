import { Language } from "../context/LanguageContext"

export type UIString = Record<Language, string>

// Static UI strings (navigation, buttons, section titles). Page content that the
// owner edits still comes from Firestore — see src/services/api.ts.
export const ui = {
  nav: {
    home: { cs: "Úvod", en: "Home", de: "Startseite" },
    menu: { cs: "Jídelní lístek", en: "Menu", de: "Speisekarte" },
    rooms: { cs: "Ubytování", en: "Rooms", de: "Unterkunft" },
    gallery: { cs: "Galerie", en: "Gallery", de: "Galerie" },
    activities: { cs: "Aktivity", en: "Activities", de: "Aktivitäten" },
    contact: { cs: "Kontakt", en: "Contact", de: "Kontakt" },
  },
  home: {
    heroSubtitle: {
      cs: "Rodinný penzion a restaurace v Sezimově Ústí, jen 2 km od Tábora",
      en: "A family-run guesthouse and restaurant in Sezimovo Ústí, just 2 km from Tábor",
      de: "Familiengeführte Pension und Restaurant in Sezimovo Ústí, nur 2 km von Tábor",
    },
    viewDailyMenu: { cs: "Denní nabídka", en: "Daily menu", de: "Tagesmenü" },
    bookStay: { cs: "Ubytujte se", en: "Book a stay", de: "Übernachten" },
    aboutTitle: { cs: "Vítejte u nás", en: "Welcome", de: "Willkommen" },
    dailyMenuTitle: { cs: "Denní menu", en: "Daily menu", de: "Tagesmenü" },
    weekendMenuTitle: { cs: "Víkendové menu", en: "Weekend menu", de: "Wochenendmenü" },
    dailyMenuNote: {
      cs: "Aktuální nabídka naší kuchyně",
      en: "Today's offer from our kitchen",
      de: "Das aktuelle Angebot unserer Küche",
    },
  },
  menu: {
    title: { cs: "Jídelní lístek", en: "Our menu", de: "Speisekarte" },
    subtitle: {
      cs: "Stálá nabídka naší restaurace",
      en: "The permanent offer of our restaurant",
      de: "Das ständige Angebot unseres Restaurants",
    },
  },
  rooms: {
    title: { cs: "Ubytování", en: "Rooms", de: "Unterkunft" },
    priceLabel: {
      cs: "za noc se snídaní",
      en: "per night incl. breakfast",
      de: "pro Nacht inkl. Frühstück",
    },
    bookNow: {
      cs: "Rezervovat na Booking.com",
      en: "Book on Booking.com",
      de: "Auf Booking.com buchen",
    },
  },
  gallery: {
    title: { cs: "Galerie", en: "Gallery", de: "Galerie" },
    pension: { cs: "Penzion", en: "Guesthouse", de: "Pension" },
    rooms: { cs: "Ubytování", en: "Rooms", de: "Unterkunft" },
    weddings: { cs: "Svatby", en: "Weddings", de: "Hochzeiten" },
  },
  activities: {
    title: { cs: "Aktivity v okolí", en: "Things to do nearby", de: "Aktivitäten in der Nähe" },
    visitWebsite: { cs: "Navštívit stránku", en: "Visit website", de: "Website besuchen" },
  },
  contact: {
    title: { cs: "Kontakt", en: "Contact", de: "Kontakt" },
  },
  common: {
    loading: { cs: "Načítání…", en: "Loading…", de: "Laden…" },
    pdfUnavailable: {
      cs: "Nabídka momentálně není k dispozici",
      en: "The menu is currently unavailable",
      de: "Das Menü ist derzeit nicht verfügbar",
    },
  },
}

export const BOOKING_URL = "https://www.booking.com/Share-V7jHm6B"
