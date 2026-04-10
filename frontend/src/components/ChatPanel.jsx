import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader } from 'lucide-react'
import { api } from '../services/api'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const ChatPanel = ({ onStockSelect }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Financial Copilot. Ask me about stocks, investments, predictions, or portfolio advice!',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await api.sendMessage(input)
      
      const assistantMessage = {
        role: 'assistant',
        content: response.response || 'I processed your request.',
        timestamp: new Date(),
        data: response
      }

      setMessages(prev => [...prev, assistantMessage])

      // Extract stock symbols from response
      if (response.recommendations && response.recommendations.length > 0) {
        onStockSelect(response.recommendations[0].symbol)
      }

    } catch (error) {
      toast.error('Failed to get response. Please try again.')
      console.error('Chat error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="bg-dark-card rounded-xl border border-dark-border h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-dark-border">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-accent-blue" />
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-accent-blue' : 'bg-dark-hover'}`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4 text-accent-blue" />
                  )}
                </div>
                <div className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-accent-blue' : 'bg-dark-hover'}`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.data?.recommendations && (
                    <div className="mt-3 space-y-2">
                      {message.data.recommendations.map((rec, i) => (
                        <div key={i} className="p-2 bg-dark-card rounded border border-dark-border">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-accent-blue">{rec.symbol}</span>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              rec.action === 'BUY' ? 'bg-accent-green text-white' :
                              rec.action === 'SELL' ? 'bg-accent-red text-white' :
                              'bg-accent-yellow text-white'
                            }`}>
                              {rec.action}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400">${rec.current_price}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-gray-400"
          >
            <Loader className="w-4 h-4 animate-spin" />
            <span className="text-sm">Analyzing...</span>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-dark-border">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about stocks, predictions, or portfolio..."
            className="flex-1 bg-dark-hover border border-dark-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-accent-blue hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Which stocks should I buy?', 'Predict AAPL price', 'Create portfolio $50000'].map((suggestion, i) => (
            <button
              key={i}
              onClick={() => setInput(suggestion)}
              className="text-xs bg-dark-hover hover:bg-dark-border px-3 py-1 rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatPanel
