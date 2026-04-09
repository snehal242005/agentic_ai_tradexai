import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const api = {
  // Chat
  sendMessage: async (message, userId = 'default_user') => {
    const response = await apiClient.post('/chat', { message, user_id: userId })
    return response.data
  },

  // Stocks
  getStockData: async (symbol, period = '1mo') => {
    const response = await apiClient.get(`/stocks/${symbol}`, { params: { period } })
    return response.data
  },

  getStockPrediction: async (symbol) => {
    const response = await apiClient.get(`/stocks/${symbol}/prediction`)
    return response.data
  },

  // News
  getNews: async (symbol) => {
    const response = await apiClient.get(`/news/${symbol}`)
    return response.data
  },

  // Portfolio
  createPortfolio: async (userId, budget, riskLevel) => {
    const response = await apiClient.post('/portfolio/create', {
      user_id: userId,
      budget,
      risk_level: riskLevel
    })
    return response.data
  },

  getPortfolio: async (userId = 'default_user') => {
    const response = await apiClient.get(`/portfolio/${userId}`)
    return response.data
  },

  // Alerts
  getAlerts: async (userId = 'default_user') => {
    const response = await apiClient.get(`/alerts/${userId}`)
    return response.data
  },

  // Market
  getMarketOverview: async () => {
    const response = await apiClient.get('/market/overview')
    return response.data
  }
}

export default api
