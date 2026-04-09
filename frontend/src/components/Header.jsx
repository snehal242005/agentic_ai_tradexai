import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TrendingUp, Activity, BarChart3, TrendingDown, Newspaper, Wallet, LayoutDashboard, Sparkles } from 'lucide-react'

const Header = ({ marketData }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/ai-assistant', label: 'AI Assistant', icon: Sparkles },
    { path: '/stock-analysis', label: 'Stock Analysis', icon: BarChart3 },
    { path: '/price-prediction', label: 'Predictions', icon: TrendingDown },
    { path: '/news-sentiment', label: 'News', icon: Newspaper },
    { path: '/portfolio-creator', label: 'Portfolio', icon: Wallet },
  ]

  return (
    <header className="bg-dark-card border-b border-dark-border sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-accent-blue to-accent-purple p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
                TradeXAI
              </h1>
              <p className="text-xs text-gray-400">Intelligent Investment Assistant</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-accent-green" />
              <span className="text-sm text-gray-300">Market Open</span>
            </div>
            
            {marketData && (
              <div className="hidden md:flex items-center space-x-4">
                {marketData.stocks?.slice(0, 3).map((stock) => (
                  <div key={stock.symbol} className="text-sm">
                    <span className="text-gray-400">{stock.symbol}</span>
                    <span className={`ml-2 ${stock.change >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change_percent?.toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex items-center space-x-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white'
                    : 'text-gray-400 hover:text-white hover:bg-dark-hover'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header
