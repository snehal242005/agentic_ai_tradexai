import React, { useState } from 'react'
import { Search, TrendingUp, TrendingDown, Loader } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { api } from '../services/api'
import toast from 'react-hot-toast'

const StockAnalysis = () => {
  const [symbol, setSymbol] = useState('')
  const [period, setPeriod] = useState('1mo')
  const [stockData, setStockData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async (e) => {
    e.preventDefault()
    if (!symbol.trim()) {
      toast.error('Please enter a stock symbol')
      return
    }

    setLoading(true)
    try {
      const data = await api.getStockData(symbol.toUpperCase(), period)
      setStockData(data)
      toast.success(`Analysis complete for ${symbol.toUpperCase()}`)
    } catch (error) {
      toast.error('Failed to fetch stock data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const isPositive = stockData?.change >= 0

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Stock Analysis</h1>
          <p className="text-gray-400">Analyze any stock with real-time data and technical indicators</p>
        </div>

        {/* Input Form */}
        <div className="bg-dark-card rounded-xl border border-dark-border p-6 mb-6">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stock Symbol</label>
                <div className="relative">
                  <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    placeholder="e.g., AAPL, GOOGL, MSFT"
                    className="w-full bg-dark-hover border border-dark-border rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                  <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Time Period</label>
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full bg-dark-hover border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                >
                  <option value="1d">1 Day</option>
                  <option value="1w">1 Week</option>
                  <option value="1mo">1 Month</option>
                  <option value="3mo">3 Months</option>
                  <option value="1y">1 Year</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Analyze Stock
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {stockData && (
          <div className="space-y-6">
            {/* Price Overview */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold">{stockData.symbol}</h2>
                  <div className="flex items-baseline space-x-3 mt-2">
                    <span className="text-4xl font-bold">₹{stockData.current_price}</span>
                    <span className={`flex items-center text-xl font-semibold ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                      {isPositive ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
                      {isPositive ? '+' : ''}{stockData.change} ({isPositive ? '+' : ''}{stockData.change_percent}%)
                    </span>
                  </div>
                </div>
                
                <span className={`px-4 py-2 rounded-lg font-semibold ${
                  stockData.trend === 'bullish' ? 'bg-accent-green text-white' : 'bg-accent-red text-white'
                }`}>
                  {stockData.trend?.toUpperCase()}
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-dark-hover rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Volume</p>
                  <p className="text-lg font-semibold">{stockData.volume?.toLocaleString()}</p>
                </div>
                <div className="bg-dark-hover rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">52W High</p>
                  <p className="text-lg font-semibold">₹{stockData.high_52w}</p>
                </div>
                <div className="bg-dark-hover rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">52W Low</p>
                  <p className="text-lg font-semibold">₹{stockData.low_52w}</p>
                </div>
                <div className="bg-dark-hover rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">P/E Ratio</p>
                  <p className="text-lg font-semibold">{stockData.pe_ratio?.toFixed(2) || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h3 className="text-xl font-semibold mb-4">Price History</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={stockData.historical_data}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2537" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#131827', 
                      border: '1px solid #1e2537',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="close" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fill="url(#colorPrice)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Technical Indicators */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h3 className="text-xl font-semibold mb-4">Technical Indicators</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-dark-hover rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">SMA 20</p>
                  <p className="text-2xl font-bold">₹{stockData.sma_20}</p>
                  <p className="text-xs text-gray-500 mt-1">20-day moving average</p>
                </div>
                <div className="bg-dark-hover rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">SMA 50</p>
                  <p className="text-2xl font-bold">₹{stockData.sma_50}</p>
                  <p className="text-xs text-gray-500 mt-1">50-day moving average</p>
                </div>
                <div className="bg-dark-hover rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">Market Cap</p>
                  <p className="text-2xl font-bold">
                    {stockData.market_cap ? `$${(stockData.market_cap / 1e9).toFixed(2)}B` : 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Total market value</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!stockData && !loading && (
          <div className="bg-dark-card rounded-xl border border-dark-border p-12 text-center">
            <Search className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2">No Analysis Yet</h3>
            <p className="text-gray-400">Enter a stock symbol above to start analyzing</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StockAnalysis
