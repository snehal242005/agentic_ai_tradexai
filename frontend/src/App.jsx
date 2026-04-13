import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import AIAssistant from './pages/AIAssistant'
import StockAnalysis from './pages/StockAnalysis'
import PricePrediction from './pages/PricePrediction'
import NewsSentiment from './pages/NewsSentiment'
import PortfolioCreator from './pages/PortfolioCreator'
import { api } from './services/api'

function App() {
  const [marketData, setMarketData] = useState(null)

  useEffect(() => {
    loadMarketData()
    // Refresh market data every 60 seconds
    const interval = setInterval(loadMarketData, 60000)
    return () => clearInterval(interval)
  }, [])

  const loadMarketData = async () => {
    try {
      const data = await api.getMarketOverview()
      setMarketData(data)
    } catch (error) {
      console.error('Failed to load market data:', error)
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#131827',
              color: '#e5e7eb',
              border: '1px solid #1e2537'
            }
          }}
        />

        <Header marketData={marketData} />

        <Routes>
          {/* AI Assistant is the main page */}
          <Route path="/" element={<AIAssistant />} />
          <Route path="/ai-assistant" element={<Navigate to="/" replace />} />

          {/* Feature Pages */}
          <Route path="/stock-analysis" element={<StockAnalysis />} />
          <Route path="/price-prediction" element={<PricePrediction />} />
          <Route path="/news-sentiment" element={<NewsSentiment />} />
          <Route path="/portfolio-creator" element={<PortfolioCreator />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
