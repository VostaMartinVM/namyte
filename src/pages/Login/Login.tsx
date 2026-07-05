import { ChangeEvent, FC, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../services/firebase"
import "./Login.scss"

const Login: FC = () => {
  const navigate = useNavigate()
  const [fields, setFields] = useState({ email: "", password: "" })
  const [error, setError] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFields((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(undefined)
    setIsSubmitting(true)
    try {
      await signInWithEmailAndPassword(auth, fields.email, fields.password)
      navigate("/admin")
    } catch {
      setError("Přihlášení se nezdařilo. Zkontrolujte e-mail a heslo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='loginPage'>
      <form className='loginCard' onSubmit={handleSubmit}>
        <h1>Přihlášení</h1>
        <input
          className='loginInput'
          type='email'
          placeholder='E-mail'
          name='email'
          autoComplete='email'
          value={fields.email}
          onChange={handleChange}
          required
        />
        <input
          className='loginInput'
          type='password'
          placeholder='Heslo'
          name='password'
          autoComplete='current-password'
          value={fields.password}
          onChange={handleChange}
          required
        />
        {error && <p className='loginError'>{error}</p>}
        <button type='submit' className='btn btnPrimary' disabled={isSubmitting}>
          {isSubmitting ? "Přihlašování…" : "Přihlásit se"}
        </button>
      </form>
    </div>
  )
}

export default Login
