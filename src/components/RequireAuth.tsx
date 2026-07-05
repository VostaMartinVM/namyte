import { FC, PropsWithChildren, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase"

type AuthStatus = "loading" | "authenticated" | "anonymous"

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const [status, setStatus] = useState<AuthStatus>("loading")

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setStatus(user ? "authenticated" : "anonymous")
    })
  }, [])

  if (status === "loading") return null
  if (status === "anonymous") return <Navigate to='/login' replace />

  return <>{children}</>
}

export default RequireAuth
