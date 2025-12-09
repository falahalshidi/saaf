import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Auth.css'

interface RegisterProps {
  setIsAuthenticated: (value: boolean) => void
}

const Register = ({ setIsAuthenticated }: RegisterProps) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة')
      return
    }

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    if (users.find((u: any) => u.email === email)) {
      setError('هذا البريد الإلكتروني مستخدم بالفعل')
      return
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('user', JSON.stringify(newUser))
    setIsAuthenticated(true)
    navigate('/dashboard')
  }

  return (
    <div className="auth-container">
      <div className="logo-background-auth"></div>
      <div className="auth-content">
        <div className="auth-card">
          <h1 className="auth-title">إنشاء حساب جديد</h1>
          <p className="auth-subtitle">انضم إلى نظام سعف</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">الاسم الكامل</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="أدخل اسمك الكامل"
              />
            </div>
            
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
                placeholder="أدخل كلمة المرور (6 أحرف على الأقل)"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="أعد إدخال كلمة المرور"
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-full">
              إنشاء الحساب
            </button>
          </form>
          
          <p className="auth-footer">
            لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
          </p>
          
          <Link to="/" className="back-link">← العودة للصفحة الرئيسية</Link>
        </div>
      </div>
    </div>
  )
}

export default Register

