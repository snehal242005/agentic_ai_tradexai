import React, { useState, useEffect } from 'react'
import { Bell, TrendingUp, TrendingDown, AlertTriangle, Info, X } from 'lucide-react'
import { api } from '../services/api'
import { motion, AnimatePresence } from 'framer-motion'

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAlerts()
  }, [])

  const loadAlerts = async () => {
    setLoading(true)
    try {
      const data = await api.getAlerts()
      setAlerts(data.alerts || [])
    } catch (error) {
      console.error('Failed to load alerts:', error)
    } finally {
      setLoading(false)
    }
  }

  const dismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="w-5 h-5 text-accent-green" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-accent-yellow" />
      case 'price_alert':
        return <Info className="w-5 h-5 text-accent-blue" />
      default:
        return <Bell className="w-5 h-5 text-gray-400" />
    }
  }

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'success':
        return 'border-accent-green bg-accent-green bg-opacity-10'
      case 'warning':
        return 'border-accent-yellow bg-accent-yellow bg-opacity-10'
      case 'error':
        return 'border-accent-red bg-accent-red bg-opacity-10'
      default:
        return 'border-accent-blue bg-accent-blue bg-opacity-10'
    }
  }

  if (loading) {
    return (
      <div className="bg-dark-card rounded-xl border border-dark-border p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-dark-hover rounded w-1/3"></div>
          <div className="h-20 bg-dark-hover rounded"></div>
          <div className="h-20 bg-dark-hover rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-dark-card rounded-xl border border-dark-border h-full"
    >
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-accent-red bg-opacity-20 p-2 rounded-lg relative">
              <Bell className="w-5 h-5 text-accent-red" />
              {alerts.filter(a => !a.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {alerts.filter(a => !a.read).length}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">Alerts & Notifications</h3>
              <p className="text-sm text-gray-400">Real-time market updates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          <AnimatePresence>
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No alerts at the moment</p>
              </div>
            ) : (
              alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.severity)} ${
                    !alert.read ? 'ring-2 ring-opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">{alert.symbol}</span>
                          {!alert.read && (
                            <span className="w-2 h-2 bg-accent-blue rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-300">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="text-gray-400 hover:text-white transition-colors ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Alert Summary */}
        {alerts.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="bg-dark-hover rounded-lg p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">Total</p>
              <p className="text-lg font-semibold">{alerts.length}</p>
            </div>
            <div className="bg-dark-hover rounded-lg p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">Unread</p>
              <p className="text-lg font-semibold text-accent-blue">
                {alerts.filter(a => !a.read).length}
              </p>
            </div>
            <div className="bg-dark-hover rounded-lg p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">Opportunities</p>
              <p className="text-lg font-semibold text-accent-green">
                {alerts.filter(a => a.type === 'opportunity').length}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default AlertsPanel
