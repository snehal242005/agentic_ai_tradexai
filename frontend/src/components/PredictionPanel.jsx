import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Activity, Target } from 'lucide-react'
import { api } from '../services/api'
import { motion } from 'framer-motion'

const PredictionPanel = ({ selectedStock }) => {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPrediction()
  }, [selectedStock])

  const loadPrediction = async () => {
    setLoading(true)
    try {
      const data = await api.getStockPrediction(selectedStock)
      setPrediction(data)
    } catch (error) {
      console.error('Failed to load prediction:', error)
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

  if (!prediction) return null

  // Combine historical and prediction data for chart
  const chartData = [
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
  ]

  const isUpward = prediction.trend === 'upward'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-dark-card rounded-xl border border-dark-border"
    >
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-accent-purple bg-opacity-20 p-2 rounded-lg">
              <Target className="w-5 h-5 text-accent-purple" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Price Prediction</h3>
              <p className="text-sm text-gray-400">AI-powered 7-day forecast</p>
            </div>
          </div>
          
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
            isUpward ? 'bg-accent-green bg-opacity-20 text-accent-green' : 'bg-accent-red bg-opacity-20 text-accent-red'
          }`}>
            <TrendingUp className={`w-4 h-4 ${!isUpward && 'rotate-180'}`} />
            <span className="text-sm font-semibold">{prediction.trend.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={250}>
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
              dot={{ fill: '#3b82f6', r: 3 }}
              name="Actual Price"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#8b5cf6', r: 3 }}
              name="Predicted Price"
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Prediction Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-dark-hover rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Current Price</p>
            <p className="text-lg font-semibold">${prediction.current_price}</p>
          </div>
          <div className="bg-dark-hover rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">7-Day Target</p>
            <p className="text-lg font-semibold text-accent-purple">
              ${prediction.predictions[prediction.predictions.length - 1]?.predicted_price}
            </p>
          </div>
          <div className="bg-dark-hover rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Model Accuracy</p>
            <p className="text-lg font-semibold text-accent-green">{prediction.metrics.accuracy}%</p>
          </div>
          <div className="bg-dark-hover rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Confidence</p>
            <p className="text-lg font-semibold">{prediction.metrics.confidence.toUpperCase()}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-4 bg-dark-hover rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-3">Model Performance Metrics</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-gray-400">MSE</p>
              <p className="text-sm font-semibold">{prediction.metrics.mse}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">MAE</p>
              <p className="text-sm font-semibold">{prediction.metrics.mae}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Accuracy</p>
              <p className="text-sm font-semibold text-accent-green">{prediction.metrics.accuracy}%</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PredictionPanel
