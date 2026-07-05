# Penzion a Restaurace Na Mýtě

Website for a family-run guesthouse and restaurant in Sezimovo Ústí (near Tábor, Czech Republic).

Built with React 18 + TypeScript (Create React App), SCSS, framer-motion, and Firebase (Firestore for translated content, Storage for images and menu PDFs, Auth for the admin area).

## Pages

| Route         | Description                                                            |
| ------------- | ---------------------------------------------------------------------- |
| `/`           | Home — hero slider, introduction, and the daily & weekend menus (PDF) |
| `/menu`       | Full restaurant menu, grouped by category                              |
| `/rooms`      | Accommodation info, photos, and Booking.com link                       |
| `/gallery`    | Photo gallery with lightbox                                            |
| `/activities` | Things to do in the area                                               |
| `/contact`    | Address, phone, e-mail, and map                                        |
| `/login`      | Admin sign-in                                                          |
| `/admin`      | Upload/replace the daily and weekend menu PDFs (auth required)         |

The old Czech routes (`/DenniNabidka`, `/NabidkaJidel`, `/Ubytovani`, `/Galerie`, `/Aktivity`, `/Onas`) redirect to their English equivalents.

## Project structure

```
src/
  components/   Shared UI (Navbar, Footer, ImageSlider, Lightbox, PdfViewer, ...)
  context/      LanguageContext (cs / en / de, persisted to localStorage)
  i18n/         Static UI strings for all three languages
  pages/        One folder per route
  services/     Firebase initialization and data access
  styles/       Global styles and design tokens (CSS custom properties)
  types/        Shared TypeScript types
```

Content the owner edits (page texts, menu items) lives in Firestore under
`translation_collection_path`; images and menu PDFs live in Firebase Storage.
The Firestore document ids and Storage folder names are kept in their original
Czech form because they refer to existing server-side data.

## Setup

Create a `.env` file with the Firebase web app configuration
(`REACT_APP_FIREBASE_API_KEY`, `REACT_APP_FIREBASE_AUTH_DOMAIN`, `REACT_APP_FIREBASE_PROJECTID`,
`REACT_APP_FIREBASE_STORAGE_BUCKET`, `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`,
`REACT_APP_FIREBASE_APP_ID`, `REACT_APP_FIREBASE_MEASUREMENT_ID`), then:

```
npm install
npm start        # development server on http://localhost:3000
npm run build    # production build into build/
```
