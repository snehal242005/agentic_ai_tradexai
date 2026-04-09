import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './components/LandingPage'
import Header from './components/Header'
import ChatPanel from './components/ChatPanel'
import StockDashboard from './components/StockDashboard'
import PortfolioPanel from './components/PortfolioPanel'
import PredictionPanel from './components/PredictionPanel'
import NewsPanel from './components/NewsPanel'
import AlertsPanel from './components/AlertsPanel'
import StockAnalysis from './pages/StockAnalysis'
import PricePrediction from './pages/PricePrediction'
import NewsSentiment from './pages/NewsSentiment'
import PortfolioCreator from './pages/PortfolioCreator'
import AIAssistant from './pages/AIAssistant'
import { api } from './services/api'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedStock, setSelectedStock] = useState('AAPL')
  const [marketData, setMarketData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoggedIn) {
      loadMarketData()
    }
  }, [isLoggedIn])

  const loadMarketData = async () => {
    try {
      const data = await api.getMarketOverview()
      setMarketData(data)
    } catch (error) {
      console.error('Failed to load market data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />
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
          {/* Main Dashboard */}
          <Route path="/" element={
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-3">
                  <ChatPanel onStockSelect={setSelectedStock} />
                </div>
                
                <div className="lg:col-span-9 space-y-4">
                  <StockDashboard selectedStock={selectedStock} />
                  
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <PredictionPanel selectedStock={selectedStock} />
                    <NewsPanel selectedStock={selectedStock} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
                <div className="lg:col-span-9">
                  <PortfolioPanel />
                </div>
                <div className="lg:col-span-3">
                  <AlertsPanel />
                </div>
              </div>
            </div>
          } />

          {/* Feature Pages */}
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/stock-analysis" element={<StockAnalysis />} />
          <Route path="/price-prediction" element={<PricePrediction />} />
          <Route path="/news-sentiment" element={<NewsSentiment />} />
          <Route path="/portfolio-creator" element={<PortfolioCreator />} />

          {/* Redirect unknown routes to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
