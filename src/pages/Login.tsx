import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void
}

const Login = ({ setIsAuthenticated }: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u: any) => u.email === email && u.password === password)

    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
      setIsAuthenticated(true)
      navigate('/dashboard')
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة')
    }
  }

  return (
    <div className="auth-container">
      <div className="logo-background-auth"></div>
      <div className="auth-content">
        <div className="auth-card">
          <h1 className="auth-title">تسجيل الدخول</h1>
          <p className="auth-subtitle">مرحباً بك في نظام سعف</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">كلمة المرور</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="أدخل كلمة المرور"
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-full">
              تسجيل الدخول
            </button>
          </form>
          
          <p className="auth-footer">
            ليس لديك حساب؟ <Link to="/register">إنشاء حساب جديد</Link>
          </p>
          
          <Link to="/" className="back-link">← العودة للصفحة الرئيسية</Link>
        </div>
      </div>
    </div>
  )
}

export default Login

