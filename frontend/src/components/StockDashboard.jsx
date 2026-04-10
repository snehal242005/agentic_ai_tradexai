import React, { useState, useEffect } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react'
import { api } from '../services/api'
import { motion } from 'framer-motion'

const StockDashboard = ({ selectedStock }) => {
  const [stockData, setStockData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('1mo')
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    loadStockData()
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadStockData, 30000)
    return () => clearInterval(interval)
  }, [selectedStock, period])

  const loadStockData = async () => {
    try {
      const data = await api.getStockData(selectedStock, period)
      setStockData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to load stock data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-dark-card rounded-xl border border-dark-border p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-dark-hover rounded w-1/3"></div>
          <div className="h-64 bg-dark-hover rounded"></div>
        </div>
      </div>
    )
  }

  if (!stockData) return null

  const isPositive = stockData.change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-card rounded-xl border border-dark-border overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{stockData.symbol}</h2>
            <div className="flex items-baseline space-x-3 mt-2">
              <span className="text-3xl font-bold">${stockData.current_price}</span>
              <span className={`flex items-center text-lg font-semibold ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                {isPositive ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
                {isPositive ? '+' : ''}{stockData.change} ({isPositive ? '+' : ''}{stockData.change_percent}%)
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            {lastUpdated && (
              <span className="text-xs text-gray-500">
                Live · updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
            <div className="flex space-x-2">
            {['1d', '1w', '1mo', '3mo', '1y'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  period === p ? 'bg-accent-blue text-white' : 'bg-dark-hover hover:bg-dark-border'
                }`}
              >
                {p}
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <StatCard label="Volume" value={stockData.volume?.toLocaleString()} />
          <StatCard label="52W High" value={`$${stockData.high_52w}`} />
          <StatCard label="52W Low" value={`$${stockData.low_52w}`} />
          <StatCard label="P/E Ratio" value={stockData.pe_ratio?.toFixed(2) || 'N/A'} />
        </div>
      </div>

      {/* Chart */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
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
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#131827', 
                border: '1px solid #1e2537',
                borderRadius: '8px'
              }}
              labelStyle={{ color: '#e5e7eb' }}
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
      <div className="px-6 pb-6">
        <div className="bg-dark-hover rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3">Technical Indicators</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">SMA 20</p>
              <p className="text-lg font-semibold">${stockData.sma_20}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">SMA 50</p>
              <p className="text-lg font-semibold">${stockData.sma_50}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Trend</p>
              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                stockData.trend === 'bullish' ? 'bg-accent-green text-white' : 'bg-accent-red text-white'
              }`}>
                {stockData.trend?.toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400">Market Cap</p>
              <p className="text-lg font-semibold">
                {stockData.market_cap ? `$${(stockData.market_cap / 1e9).toFixed(2)}B` : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const StatCard = ({ label, value }) => (
  <div className="bg-dark-hover rounded-lg p-3">
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
)

export default StockDashboard
