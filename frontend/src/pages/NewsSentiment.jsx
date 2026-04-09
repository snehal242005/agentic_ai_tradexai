import React, { useState } from 'react'
import { Newspaper, Loader, ThumbsUp, ThumbsDown, Minus } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { api } from '../services/api'
import toast from 'react-hot-toast'

const NewsSentiment = () => {
  const [symbol, setSymbol] = useState('')
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async (e) => {
    e.preventDefault()
    if (!symbol.trim()) {
      toast.error('Please enter a stock symbol')
      return
    }

    setLoading(true)
    try {
      const data = await api.getNews(symbol.toUpperCase())
      setNews(data)
      toast.success(`News analysis complete for ${symbol.toUpperCase()}`)
    } catch (error) {
      toast.error('Failed to fetch news')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const sentimentData = news ? [
    { name: 'Positive', value: news.positive_count, color: '#10b981' },
    { name: 'Negative', value: news.negative_count, color: '#ef4444' },
    { name: 'Neutral', value: news.neutral_count, color: '#6b7280' }
  ] : []

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="w-5 h-5 text-accent-green" />
      case 'negative':
        return <ThumbsDown className="w-5 h-5 text-accent-red" />
      default:
        return <Minus className="w-5 h-5 text-gray-400" />
    }
  }

  const getSentimentBadge = (sentiment) => {
    const colors = {
      positive: 'bg-accent-green text-white',
      negative: 'bg-accent-red text-white',
      neutral: 'bg-gray-600 text-white'
    }
    return colors[sentiment] || colors.neutral
  }

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">News Sentiment Analysis</h1>
          <p className="text-gray-400">AI-powered sentiment analysis of latest market news</p>
        </div>

        {/* Input Form */}
        <div className="bg-dark-card rounded-xl border border-dark-border p-6 mb-6">
          <form onSubmit={handleAnalyze}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Stock Symbol</label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="Enter stock symbol (e.g., AAPL, TSLA, GOOGL)"
                  className="w-full bg-dark-hover border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-yellow"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-accent-yellow to-accent-red px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing News...
                  </>
                ) : (
                  <>
                    <Newspaper className="w-5 h-5 mr-2" />
                    Analyze Sentiment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {news && (
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{news.symbol} News Sentiment</h2>
                  <p className="text-gray-400">Based on {news.articles.length} recent articles</p>
                </div>
                <div className={`px-6 py-3 rounded-lg font-bold text-lg ${
                  news.overall_sentiment === 'positive' ? 'bg-accent-green text-white' :
                  news.overall_sentiment === 'negative' ? 'bg-accent-red text-white' :
                  'bg-gray-600 text-white'
                }`}>
                  {news.overall_sentiment?.toUpperCase() || 'N/A'}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-500 bg-opacity-10 border border-green-500 rounded-lg p-4 text-center">
                  <ThumbsUp className="w-8 h-8 mx-auto mb-2 text-accent-green" />
                  <p className="text-3xl font-bold text-accent-green">{news.positive_count}</p>
                  <p className="text-sm text-gray-400 mt-1">Positive</p>
                </div>
                <div className="bg-red-500 bg-opacity-10 border border-red-500 rounded-lg p-4 text-center">
                  <ThumbsDown className="w-8 h-8 mx-auto mb-2 text-accent-red" />
                  <p className="text-3xl font-bold text-accent-red">{news.negative_count}</p>
                  <p className="text-sm text-gray-400 mt-1">Negative</p>
                </div>
                <div className="bg-gray-500 bg-opacity-10 border border-gray-500 rounded-lg p-4 text-center">
                  <Minus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-3xl font-bold text-gray-400">{news.neutral_count}</p>
                  <p className="text-sm text-gray-400 mt-1">Neutral</p>
                </div>
              </div>
            </div>

            {/* Sentiment Chart */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h3 className="text-xl font-semibold mb-4">Sentiment Distribution</h3>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/2">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="bg-dark-hover rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-2">Sentiment Score</p>
                    <p className="text-3xl font-bold">{(news.sentiment_score * 100).toFixed(1)}</p>
                    <div className="mt-2 h-2 bg-dark-border rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${news.sentiment_score > 0 ? 'bg-accent-green' : 'bg-accent-red'}`}
                        style={{ width: `${Math.abs(news.sentiment_score) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-dark-hover rounded-lg p-4">
                    <p className="text-sm text-gray-400 mb-2">Total Articles Analyzed</p>
                    <p className="text-3xl font-bold">{news.articles.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Articles List */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Articles</h3>
              <div className="space-y-4">
                {news.articles.map((article, index) => (
                  <div 
                    key={index}
                    className="bg-dark-hover rounded-lg p-4 hover:bg-dark-border transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getSentimentIcon(article.sentiment)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSentimentBadge(article.sentiment)}`}>
                          {article.sentiment?.toUpperCase() || 'N/A'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(article.published_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{article.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{article.source}</span>
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(article.url, '_blank', 'noopener,noreferrer');
                          e.preventDefault();
                        }}
                        className="text-accent-blue hover:text-accent-purple text-sm font-medium cursor-pointer"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!news && !loading && (
          <div className="bg-dark-card rounded-xl border border-dark-border p-12 text-center">
            <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold mb-2">No Analysis Yet</h3>
            <p className="text-gray-400">Enter a stock symbol above to analyze news sentiment</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsSentiment
