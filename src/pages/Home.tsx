import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-background"></div>
      <div className="home-content">
        <div className="hero-section">
          <h1 className="main-title">سعف</h1>
          <p className="subtitle">نظام ذكي لمراقبة ومكافحة سوسة النخيل</p>
          <p className="description">
            حل متكامل لمراقبة صحة النخيل من خلال أجهزة استشعار متطورة
            تتيح لك متابعة الإحصائيات والتنبيهات في الوقت الفعلي
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">
              إنشاء حساب جديد
            </Link>
            <Link to="/login" className="btn btn-secondary">
              تسجيل الدخول
            </Link>
          </div>
        </div>
        <div className="features-section">
          <div className="feature-card">
            <h3>مراقبة مستمرة</h3>
            <p>تتبع حالة النخيل على مدار الساعة</p>
          </div>
          <div className="feature-card">
            <h3>إحصائيات دقيقة</h3>
            <p>بيانات مفصلة من أجهزة الاستشعار</p>
          </div>
          <div className="feature-card">
            <h3>تنبيهات فورية</h3>
            <p>إشعارات فورية عند اكتشاف أي مشكلة</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

