import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader, Sparkles, TrendingUp, MessageSquare } from 'lucide-react'
import { api } from '../services/api'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Financial Copilot. I can help you with:\n\n• Stock analysis and recommendations\n• Price predictions and trends\n• News sentiment analysis\n• Portfolio creation and optimization\n• Investment advice based on your risk tolerance\n\nWhat would you like to know?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')

    // Add user message
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newUserMessage])

    setLoading(true)
    try {
      const response = await api.sendMessage(userMessage, 'default_user')
      
      // Add assistant response
      const assistantMessage = {
        role: 'assistant',
        content: response.response || response.message || 'I processed your request.',
        data: response.data,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      toast.error('Failed to get response from AI')
      
      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again or rephrase your question.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleQuickAction = (question) => {
    setInput(question)
    inputRef.current?.focus()
  }

  const quickActions = [
    'Analyze AAPL stock',
    'Predict TSLA price for next week',
    'Create a portfolio with ₹100000',
    'Why is the market falling today?',
    'Suggest low-risk investments',
    'Compare GOOGL vs MSFT'
  ]


  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-r from-accent-blue to-accent-purple p-3 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">AI Assistant</h1>
              <p className="text-gray-400">Your intelligent financial advisor powered by multi-agent AI</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-dark-card rounded-xl border border-dark-border flex flex-col" style={{ height: 'calc(100vh - 250px)' }}>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        message.role === 'user'
                          ? 'bg-accent-blue'
                          : 'bg-gradient-to-r from-accent-purple to-accent-blue'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div
                      className={`flex-1 ${
                        message.role === 'user' ? 'text-right' : ''
                      }`}
                    >
                      <div
                        className={`inline-block max-w-[85%] rounded-xl p-4 ${
                          message.role === 'user'
                            ? 'bg-accent-blue text-white'
                            : 'bg-dark-hover text-gray-100'
                        }`}
                      >
                        <div className="text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                        
                        {/* Display data if available */}
                        {message.data && (
                          <div className="mt-3 pt-3 border-t border-gray-600">
                            <div className="text-xs text-gray-300">
                              {message.data.symbols && (
                                <div className="mb-2">
                                  <span className="font-semibold">Analyzed: </span>
                                  {message.data.symbols.join(', ')}
                                </div>
                              )}
                              {message.data.intent && (
                                <div>
                                  <span className="font-semibold">Intent: </span>
                                  {message.data.intent.replace('_', ' ')}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {loading && (
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-accent-purple to-accent-blue flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-dark-hover rounded-xl p-4">
                      <div className="flex items-center space-x-2">
                        <Loader className="w-4 h-4 animate-spin text-accent-blue" />
                        <span className="text-sm text-gray-400">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-dark-border p-4">
                <form onSubmit={handleSend} className="flex items-center space-x-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about stocks, investments, or market trends..."
                    disabled={loading}
                    className="flex-1 bg-dark-hover border border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-blue disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="bg-gradient-to-r from-accent-blue to-accent-purple p-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-5 h-5 text-accent-blue" />
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    disabled={loading}
                    className="w-full text-left bg-dark-hover hover:bg-dark-border border border-dark-border rounded-lg p-3 text-sm transition-colors disabled:opacity-50"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-dark-card rounded-xl border border-dark-border p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-accent-green" />
                <h3 className="text-lg font-semibold">AI Capabilities</h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start space-x-2">
                  <span className="text-accent-blue mt-1">•</span>
                  <span>Real-time stock data analysis</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-blue mt-1">•</span>
                  <span>7-day price predictions using ML</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-blue mt-1">•</span>
                  <span>News sentiment analysis</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-blue mt-1">•</span>
                  <span>Portfolio optimization</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-blue mt-1">•</span>
                  <span>Risk assessment & recommendations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-accent-blue mt-1">•</span>
                  <span>Multi-stock comparison</span>
                </li>
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 rounded-xl border border-accent-blue/20 p-6">
              <h3 className="text-lg font-semibold mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Be specific with stock symbols (e.g., AAPL, GOOGL)</li>
                <li>• Mention your budget for portfolio advice</li>
                <li>• Specify risk tolerance (low/medium/high)</li>
                <li>• Ask follow-up questions for clarity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
