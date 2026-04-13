import { useState } from 'react'
import { Target, Loader, TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { api } from '../services/api'
import toast from 'react-hot-toast'

const PricePrediction = () => {
  const [symbol, setSymbol] = useState('')
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)

  const handlePredict = async (e) => {
    e.preventDefault()
    if (!symbol.trim()) {
      toast.error('Please enter a stock symbol')
      return
    }

    setLoading(true)
    try {
      const data = await api.getStockPrediction(symbol.toUpperCase())
      setPrediction(data)
      toast.success(`Prediction generated for ${symbol.toUpperCase()}`)
    } catch (error) {
      toast.error('Failed to generate prediction')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const chartData = prediction ? [
    ...prediction.historical_actual.slice(-10).map(d => ({
      date: d.date,
      actual: d.price,
      predicted: null
    })),
    ...prediction.predictions.map(d => ({
      date: d.date,
      actual: null,
      predicted: d.predicted_price
    }))
  ] : []

  const isUpward = prediction?.trend === 'upward'

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Price Prediction</h1>
          <p className="text-gray-400">AI-powered 7-day stock price forecasting with ML models</p>
        </div>

        {/* Input Form */}
        <div className="bg-dark-card rounded-xl border border-dark-border p-6 mb-6">
          <form onSubmit={handlePredict}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stock Symbol</label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="Enter stock symbol (e.g., AAPL, TSLA, GOOGL)"
                  className="w-full bg-dark-hover border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-purple"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-accent-purple to-accent-blue px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Generating Prediction...
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5 mr-2" />
                    Predict Price
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {prediction && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{prediction.symbol} Prediction</h2>
                  <p className="text-gray-400">7-day price forecast</p>
                </div>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isUpward ? 'bg-accent-green bg-opacity-20 text-accent-green' : 'bg-accent-red bg-opacity-20 text-accent-red'
                }`}>
                  {isUpward ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  <span className="font-semibold">{prediction.trend.toUpperCase()} TREND</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-hover rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">Current Price</p>
                  <p className="text-2xl font-bold">${prediction.current_price}</p>
                </div>
                <div className="bg-dark-hover rounded-lg p-4">
                  <p className="text-xs text-gray-400 mb-1">7-Day Target</p>
                  <p className="text-2xl font-bold text-accent-purple">
                    ${prediction.predictions[prediction.predictions.length - 1]?.predicted_price}
                  </p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h3 className="text-xl font-semibold mb-4">Prediction Chart</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2537" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#131827', 
                      border: '1px solid #1e2537',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    name="Actual Price"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#8b5cf6', r: 4 }}
                    name="Predicted Price"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Predictions Table */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h3 className="text-xl font-semibold mb-4">Daily Predictions</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Date</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Predicted Price</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Confidence</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prediction.predictions.map((pred, index) => {
                      const prevPrice = index === 0 ? prediction.current_price : prediction.predictions[index - 1].predicted_price
                      const change = ((pred.predicted_price - prevPrice) / prevPrice * 100).toFixed(2)
                      const isPositive = change >= 0
                      
                      return (
                        <tr key={index} className="border-b border-dark-border hover:bg-dark-hover transition-colors">
                          <td className="py-3 px-4">{pred.date}</td>
                          <td className="text-right py-3 px-4 font-semibold">${pred.predicted_price}</td>
                          <td className="text-right py-3 px-4">{(pred.confidence * 100).toFixed(0)}%</td>
                          <td className={`text-right py-3 px-4 font-semibold ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
                            {isPositive ? '+' : ''}{change}%
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Empty State */}
        {!prediction && !loading && (
          <div className="bg-dark-card rounded-xl border border-dark-border p-12 text-center">
            <Target className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2">No Predictions Yet</h3>
            <p className="text-gray-400">Enter a stock symbol above to generate AI-powered predictions</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PricePrediction
