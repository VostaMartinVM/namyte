import { ChangeEvent, FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MdLogout, MdUploadFile } from "react-icons/md"
import { auth } from "../../services/firebase"
import { replaceDailyMenuPdf, replaceWeekendMenuPdf } from "../../services/api"
import "./Admin.scss"

type UploadState = "idle" | "uploading" | "done" | "error"

type MenuUploadProps = {
  title: string
  onUpload: (file: File) => Promise<void>
}

const MenuUpload: FC<MenuUploadProps> = ({ title, onUpload }) => {
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<UploadState>("idle")

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] ?? null)
    setState("idle")
  }

  const handleUpload = async () => {
    if (!file) return
    setState("uploading")
    try {
      await onUpload(file)
      setState("done")
    } catch (error) {
      console.error("Upload failed:", error)
      setState("error")
    }
  }

  return (
    <div className='adminCard'>
      <h2>{title}</h2>
      <input type='file' accept='application/pdf' onChange={handleFileChange} />
      <button
        className='btn btnPrimary'
        onClick={handleUpload}
        disabled={!file || state === "uploading"}
      >
        <MdUploadFile />
        {state === "uploading" ? "Nahrávání…" : "Nahrát"}
      </button>
      {state === "done" && <p className='adminStatus done'>Nahráno ✓</p>}
      {state === "error" && <p className='adminStatus error'>Nahrávání se nezdařilo</p>}
    </div>
  )
}

const Admin: FC = () => {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await auth.signOut()
    navigate("/login")
  }

  return (
    <div className='adminPage'>
      <div className='adminHeader'>
        <h1>Administrace</h1>
        <button className='btn btnDark' onClick={handleSignOut}>
          <MdLogout />
          Odhlásit se
        </button>
      </div>

      <div className='adminGrid'>
        <MenuUpload title='Denní menu (PDF)' onUpload={replaceDailyMenuPdf} />
        <MenuUpload title='Víkendové menu (PDF)' onUpload={replaceWeekendMenuPdf} />
      </div>
    </div>
  )
}

export default Admin
