import { useState } from 'react'
import { Wallet, TrendingUp, Shield, Loader, PieChart } from 'lucide-react'
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { api } from '../services/api'
import toast from 'react-hot-toast'

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4']

const PortfolioCreator = () => {
  const [budget, setBudget] = useState('')
  const [riskLevel, setRiskLevel] = useState('medium')
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCreatePortfolio = async (e) => {
    e.preventDefault()
    if (!budget || parseFloat(budget) <= 0) {
      toast.error('Please enter a valid budget')
      return
    }
    setLoading(true)
    try {
      const data = await api.createPortfolio('default_user', parseFloat(budget), riskLevel)
      setPortfolio(data)
      toast.success('Portfolio created successfully!')
    } catch (error) {
      toast.error('Failed to create portfolio')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getRiskBgColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-accent-green'
      case 'medium': return 'bg-accent-blue'
      case 'high': return 'bg-accent-red'
      default: return 'bg-gray-600'
    }
  }

  // Pie chart data from holdings
  const pieData = portfolio?.holdings?.map(h => ({
    name: h.symbol,
    value: h.allocation_percent,
    amount: h.amount
  })) || []

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Portfolio Creator</h1>
          <p className="text-gray-400">Build a diversified investment portfolio based on your budget and risk tolerance</p>
        </div>

        {/* Input Form */}
        <div className="bg-dark-card rounded-xl border border-dark-border p-6 mb-6">
          <form onSubmit={handleCreatePortfolio} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Investment Budget (₹)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g., 100000"
                    min="1000"
                    step="1000"
                    className="w-full bg-dark-hover border border-dark-border rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  />
                  <Wallet className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum: ₹1,000</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Risk Tolerance</label>
                <select
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value)}
                  className="w-full bg-dark-hover border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                >
                  <option value="low">Low Risk - Conservative</option>
                  <option value="medium">Medium Risk - Balanced</option>
                  <option value="high">High Risk - Aggressive</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {riskLevel === 'low' && 'Focus on stable, dividend-paying stocks'}
                  {riskLevel === 'medium' && 'Balanced mix of growth and stability'}
                  {riskLevel === 'high' && 'Growth-focused with higher volatility'}
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <><Loader className="w-5 h-5 mr-2 animate-spin" />Creating Portfolio...</>
              ) : (
                <><PieChart className="w-5 h-5 mr-2" />Create Portfolio</>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {portfolio && (
          <div className="space-y-6">
            {/* Portfolio Overview */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Your Portfolio</h2>
                  <p className="text-gray-400">Optimized for {portfolio.risk_level} risk tolerance</p>
                </div>
                <span className={`px-4 py-2 rounded-lg font-semibold ${getRiskBgColor(portfolio.risk_level)} text-white`}>
                  {portfolio.risk_level?.toUpperCase()} RISK
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-dark-hover rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Total Investment</p>
                  <p className="text-2xl font-bold">₹{portfolio.invested_amount?.toLocaleString()}</p>
                </div>
                <div className="bg-dark-hover rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Current Value</p>
                  <p className="text-2xl font-bold text-accent-green">₹{portfolio.current_value?.toLocaleString()}</p>
                </div>
                <div className="bg-dark-hover rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">No. of Stocks</p>
                  <p className="text-2xl font-bold">{portfolio.holdings?.length || 0}</p>
                </div>
              </div>
            </div>

            {/* Chart + Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="bg-dark-card rounded-xl border border-dark-border p-6">
                <h3 className="text-xl font-semibold mb-4">Portfolio Allocation</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPie>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#131827', border: '1px solid #1e2537', borderRadius: '8px' }}
                      formatter={(value, _name, props) => [`${value}% — ₹${props.payload.amount?.toLocaleString()}`, props.payload.name]}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>

              {/* Stock Breakdown */}
              <div className="bg-dark-card rounded-xl border border-dark-border p-6">
                <h3 className="text-xl font-semibold mb-4">Stock Breakdown</h3>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {portfolio.holdings?.map((stock, index) => (
                    <div key={stock.symbol} className="bg-dark-hover rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                          <span className="font-semibold">{stock.symbol}</span>
                        </div>
                        <span className="text-sm font-semibold">{stock.allocation_percent}%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-400 text-xs">Investment</p>
                          <p className="font-semibold">₹{stock.amount?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">Current Value</p>
                          <p className="font-semibold">₹{stock.current_value?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Risk Info */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="w-5 h-5 text-accent-blue" />
                <h3 className="text-xl font-semibold">Risk Profile</h3>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <TrendingUp className="w-4 h-4 text-accent-green" />
                <p>
                  {riskLevel === 'low' && 'Conservative portfolio focused on stable, established companies with consistent dividends.'}
                  {riskLevel === 'medium' && 'Balanced portfolio mixing growth stocks and stable blue-chips for optimal risk-reward.'}
                  {riskLevel === 'high' && 'Aggressive growth portfolio with high-volatility stocks for maximum potential returns.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!portfolio && !loading && (
          <div className="bg-dark-card rounded-xl border border-dark-border p-12 text-center">
            <Wallet className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2">No Portfolio Yet</h3>
            <p className="text-gray-400">Enter your budget and risk level above to create a personalized portfolio</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PortfolioCreator
