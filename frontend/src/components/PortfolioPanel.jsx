import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Briefcase, TrendingUp, DollarSign, PieChart as PieIcon } from 'lucide-react'
import { api } from '../services/api'
import { motion } from 'framer-motion'

const PortfolioPanel = () => {
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPortfolio()
  }, [])

  const loadPortfolio = async () => {
    setLoading(true)
    try {
      const data = await api.getPortfolio()
      setPortfolio(data)
    } catch (error) {
      console.error('Failed to load portfolio:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-dark-card rounded-xl border border-dark-border p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-dark-hover rounded w-1/4"></div>
          <div className="h-48 bg-dark-hover rounded"></div>
        </div>
      </div>
    )
  }

  if (!portfolio) return null

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

  const pieData = portfolio.holdings.map((holding, index) => ({
    name: holding.symbol,
    value: holding.allocation_percent,
    amount: holding.amount,
    color: COLORS[index % COLORS.length]
  }))

  const isProfit = portfolio.total_profit_loss >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-dark-card rounded-xl border border-dark-border"
    >
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-accent-green bg-opacity-20 p-2 rounded-lg">
              <Briefcase className="w-5 h-5 text-accent-green" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Portfolio Overview</h3>
              <p className="text-sm text-gray-400">Your investment allocation</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-400">Total Value</p>
            <p className="text-2xl font-bold">${portfolio.current_value.toLocaleString()}</p>
            <p className={`text-sm font-semibold ${isProfit ? 'text-accent-green' : 'text-accent-red'}`}>
              {isProfit ? '+' : ''}{portfolio.total_profit_loss_percent.toFixed(2)}% 
              ({isProfit ? '+' : ''}${portfolio.total_profit_loss.toLocaleString()})
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Allocation Pie Chart */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Asset Allocation</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value.toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#131827', 
                    border: '1px solid #1e2537',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name, props) => [
                    `${value.toFixed(1)}% ($${props.payload.amount.toLocaleString()})`,
                    props.payload.name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Chart */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Performance History</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={portfolio.performance_history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2537" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  tick={{ fill: '#9ca3af', fontSize: 10 }}
                />
                <YAxis 
                  stroke="#6b7280"
                  tick={{ fill: '#9ca3af', fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#131827', 
                    border: '1px solid #1e2537',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-4">Holdings</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Symbol</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Allocation</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Amount</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Current Value</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">P/L</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.holdings.map((holding, index) => (
                  <motion.tr
                    key={holding.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-dark-border hover:bg-dark-hover transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="font-semibold">{holding.symbol}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4">{holding.allocation_percent.toFixed(1)}%</td>
                    <td className="text-right py-3 px-4">${holding.amount.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">${holding.current_value.toLocaleString()}</td>
                    <td className={`text-right py-3 px-4 font-semibold ${
                      holding.profit_loss >= 0 ? 'text-accent-green' : 'text-accent-red'
                    }`}>
                      {holding.profit_loss >= 0 ? '+' : ''}{holding.profit_loss_percent.toFixed(2)}%
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-dark-hover rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Invested Amount</p>
            <p className="text-lg font-semibold">${portfolio.invested_amount.toLocaleString()}</p>
          </div>
          <div className="bg-dark-hover rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Current Value</p>
            <p className="text-lg font-semibold">${portfolio.current_value.toLocaleString()}</p>
          </div>
          <div className="bg-dark-hover rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Risk Level</p>
            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
              portfolio.risk_level === 'low' ? 'bg-accent-green text-white' :
              portfolio.risk_level === 'high' ? 'bg-accent-red text-white' :
              'bg-accent-yellow text-white'
            }`}>
              {portfolio.risk_level.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PortfolioPanel
