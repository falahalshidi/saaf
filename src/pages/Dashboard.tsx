import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

interface DashboardProps {
  setIsAuthenticated: (value: boolean) => void
}

interface SensorData {
  id: string
  name: string
  location: string
  status: 'active' | 'warning' | 'critical'
  temperature: number
  humidity: number
  activity: number
  lastUpdate: string
}

const Dashboard = ({ setIsAuthenticated }: DashboardProps) => {
  const [user, setUser] = useState<any>(null)
  const [sensorData, setSensorData] = useState<SensorData[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      navigate('/login')
      return
    }
    setUser(JSON.parse(userData))
    
    // إنشاء بيانات محلية للاستشعارات
    const mockData: SensorData[] = [
      {
        id: '1',
        name: 'جهاز الاستشعار 1',
        location: 'مزرعة النخيل الشمالية',
        status: 'active',
        temperature: 28,
        humidity: 65,
        activity: 2,
        lastUpdate: new Date().toLocaleString('ar-SA')
      },
      {
        id: '2',
        name: 'جهاز الاستشعار 2',
        location: 'مزرعة النخيل الجنوبية',
        status: 'warning',
        temperature: 32,
        humidity: 58,
        activity: 5,
        lastUpdate: new Date().toLocaleString('ar-SA')
      },
      {
        id: '3',
        name: 'جهاز الاستشعار 3',
        location: 'مزرعة النخيل الشرقية',
        status: 'active',
        temperature: 26,
        humidity: 70,
        activity: 1,
        lastUpdate: new Date().toLocaleString('ar-SA')
      },
      {
        id: '4',
        name: 'جهاز الاستشعار 4',
        location: 'مزرعة النخيل الغربية',
        status: 'critical',
        temperature: 35,
        humidity: 45,
        activity: 8,
        lastUpdate: new Date().toLocaleString('ar-SA')
      }
    ]
    
    setSensorData(mockData)
    
    // تحديث البيانات كل 5 ثوان
    const interval = setInterval(() => {
      setSensorData(prev => prev.map(sensor => ({
        ...sensor,
        temperature: sensor.temperature + (Math.random() * 2 - 1),
        humidity: sensor.humidity + (Math.random() * 2 - 1),
        activity: Math.max(0, sensor.activity + Math.floor(Math.random() * 3 - 1)),
        lastUpdate: new Date().toLocaleString('ar-SA')
      })))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    navigate('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4caf50'
      case 'warning':
        return '#ff9800'
      case 'critical':
        return '#f44336'
      default:
        return '#9e9e9e'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'طبيعي'
      case 'warning':
        return 'تحذير'
      case 'critical':
        return 'حرج'
      default:
        return 'غير معروف'
    }
  }

  const totalSensors = sensorData.length
  const activeSensors = sensorData.filter(s => s.status === 'active').length
  const warningSensors = sensorData.filter(s => s.status === 'warning').length
  const criticalSensors = sensorData.filter(s => s.status === 'critical').length
  const avgTemperature = sensorData.length > 0 
    ? (sensorData.reduce((sum, s) => sum + s.temperature, 0) / sensorData.length).toFixed(1)
    : 0
  const avgHumidity = sensorData.length > 0
    ? (sensorData.reduce((sum, s) => sum + s.humidity, 0) / sensorData.length).toFixed(1)
    : 0
  const totalActivity = sensorData.reduce((sum, s) => sum + s.activity, 0)

  return (
    <div className="dashboard-container">
      <div className="logo-background-dashboard"></div>
      <div className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">لوحة التحكم</h1>
            <p className="dashboard-welcome">مرحباً، {user?.name}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">
            تسجيل الخروج
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>إجمالي الأجهزة</h3>
            <p className="stat-value">{totalSensors}</p>
          </div>
          <div className="stat-card">
            <h3>الأجهزة النشطة</h3>
            <p className="stat-value" style={{ color: '#4caf50' }}>{activeSensors}</p>
          </div>
          <div className="stat-card">
            <h3>تحذيرات</h3>
            <p className="stat-value" style={{ color: '#ff9800' }}>{warningSensors}</p>
          </div>
          <div className="stat-card">
            <h3>حالات حرجة</h3>
            <p className="stat-value" style={{ color: '#f44336' }}>{criticalSensors}</p>
          </div>
          <div className="stat-card">
            <h3>متوسط الحرارة</h3>
            <p className="stat-value">{avgTemperature}°C</p>
          </div>
          <div className="stat-card">
            <h3>متوسط الرطوبة</h3>
            <p className="stat-value">{avgHumidity}%</p>
          </div>
          <div className="stat-card">
            <h3>إجمالي النشاط</h3>
            <p className="stat-value">{totalActivity}</p>
          </div>
        </div>

        <div className="sensors-section">
          <h2 className="section-title">أجهزة الاستشعار</h2>
          <div className="sensors-grid">
            {sensorData.map(sensor => (
              <div key={sensor.id} className="sensor-card">
                <div className="sensor-header">
                  <h3>{sensor.name}</h3>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(sensor.status) }}
                  >
                    {getStatusText(sensor.status)}
                  </span>
                </div>
                <p className="sensor-location">{sensor.location}</p>
                <div className="sensor-data">
                  <div className="data-item">
                    <span className="data-label">الحرارة:</span>
                    <span className="data-value">{sensor.temperature.toFixed(1)}°C</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">الرطوبة:</span>
                    <span className="data-value">{sensor.humidity.toFixed(1)}%</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">مستوى النشاط:</span>
                    <span className="data-value">{sensor.activity}</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">آخر تحديث:</span>
                    <span className="data-value-small">{sensor.lastUpdate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

