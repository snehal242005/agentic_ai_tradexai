import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Newspaper, ThumbsUp, ThumbsDown, Minus, ExternalLink } from 'lucide-react'
import { api } from '../services/api'
import { motion } from 'framer-motion'

const NewsPanel = ({ selectedStock }) => {
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNews()
  }, [selectedStock])

  const loadNews = async () => {
    setLoading(true)
    try {
      const data = await api.getNews(selectedStock)
      setNews(data)
    } catch (error) {
      console.error('Failed to load news:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-dark-card rounded-xl border border-dark-border p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-dark-hover rounded w-1/3"></div>
          <div className="h-32 bg-dark-hover rounded"></div>
        </div>
      </div>
    )
  }

  if (!news) return null

  const sentimentData = [
    { name: 'Positive', value: news.positive_count, color: '#10b981' },
    { name: 'Negative', value: news.negative_count, color: '#ef4444' },
    { name: 'Neutral', value: news.neutral_count, color: '#6b7280' }
  ]

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="w-4 h-4 text-accent-green" />
      case 'negative':
        return <ThumbsDown className="w-4 h-4 text-accent-red" />
      default:
        return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'border-accent-green bg-accent-green bg-opacity-10'
      case 'negative':
        return 'border-accent-red bg-accent-red bg-opacity-10'
      default:
        return 'border-gray-600 bg-gray-600 bg-opacity-10'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-dark-card rounded-xl border border-dark-border"
    >
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-accent-yellow bg-opacity-20 p-2 rounded-lg">
              <Newspaper className="w-5 h-5 text-accent-yellow" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">News Sentiment Analysis</h3>
              <p className="text-sm text-gray-400">Real-time market sentiment</p>
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-lg font-semibold ${
            news.overall_sentiment === 'positive' ? 'bg-accent-green bg-opacity-20 text-accent-green' :
            news.overall_sentiment === 'negative' ? 'bg-accent-red bg-opacity-20 text-accent-red' :
            'bg-gray-600 bg-opacity-20 text-gray-400'
          }`}>
            {news.overall_sentiment.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sentiment Chart */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Sentiment Distribution</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#131827', 
                    border: '1px solid #1e2537',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-2">
              {sentimentData.map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-gray-400">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Articles */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Recent Articles</h4>
            <div className="space-y-3 max-h-[200px] overflow-y-auto">
              {news.articles.slice(0, 4).map((article, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border ${getSentimentColor(article.sentiment)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-2">{article.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{article.source}</p>
                    </div>
                    {getSentimentIcon(article.sentiment)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Articles */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-4">Latest News</h4>
          <div className="space-y-3">
            {news.articles.slice(0, 3).map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-hover rounded-lg p-4 hover:bg-dark-border transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getSentimentIcon(article.sentiment)}
                      <span className="text-xs text-gray-400">{article.source}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">
                        {new Date(article.published_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h5 className="font-medium mb-2">{article.title}</h5>
                    <p className="text-sm text-gray-400 line-clamp-2">{article.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-4 flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default NewsPanel
