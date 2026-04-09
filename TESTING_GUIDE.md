# Testing Guide

## 🧪 Testing the AI Financial Copilot

This guide helps you test all features of the application.

---

## ✅ Pre-Testing Checklist

- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:3000
- [ ] Browser console open (F12)
- [ ] No errors in terminal/console

---

## 🎯 Feature Testing

### 1. Chat Interface Testing

#### Test 1: Basic Chat Functionality
```
Steps:
1. Open http://localhost:3000
2. Locate chat panel on the left
3. Type: "Hello"
4. Press Enter or click Send

Expected:
✅ Message appears in chat
✅ AI responds within 2-3 seconds
✅ Response is relevant
✅ No errors in console
```

#### Test 2: Stock Analysis Query
```
Query: "Which stocks should I buy?"

Expected Response:
✅ List of recommended stocks
✅ BUY/SELL/HOLD indicators
✅ Current prices
✅ Reasoning provided
✅ Visual badges (green/red/yellow)
```

#### Test 3: Price Prediction Query
```
Query: "Predict AAPL price for next week"

Expected Response:
✅ 7-day forecast
✅ Current price baseline
✅ Predicted prices with dates
✅ Trend indicator (upward/downward)
✅ Confidence scores
```

#### Test 4: Portfolio Creation Query
```
Query: "Create a portfolio with ₹50000 budget, medium risk"

Expected Response:
✅ Portfolio allocation breakdown
✅ Stock symbols and percentages
✅ Amount per stock
✅ Risk level confirmation
✅ Diversification strategy
```

#### Test 5: News Sentiment Query
```
Query: "What's the sentiment around Tesla?"

Expected Response:
✅ Overall sentiment (positive/negative/neutral)
✅ Article count
✅ Sentiment distribution
✅ Recent news headlines
```

---

### 2. Stock Dashboard Testing

#### Test 1: Stock Data Display
```
Steps:
1. View the Stock Dashboard panel
2. Check default stock (AAPL)

Expected:
✅ Stock symbol displayed
✅ Current price shown
✅ Change amount and percentage
✅ Green (up) or red (down) indicator
✅ Trend arrow icon
```

#### Test 2: Historical Chart
```
Steps:
1. View the area chart
2. Hover over data points

Expected:
✅ Chart displays 30 days of data
✅ Smooth gradient fill
✅ Tooltip shows date and price
✅ X-axis shows dates
✅ Y-axis shows prices
```

#### Test 3: Period Selection
```
Steps:
1. Click period buttons (1d, 1w, 1mo, 3mo, 1y)
2. Observe chart updates

Expected:
✅ Chart data updates
✅ Button highlights active period
✅ Smooth transition
✅ No loading errors
```

#### Test 4: Key Metrics
```
Check:
- Volume
- 52W High
- 52W Low
- P/E Ratio

Expected:
✅ All metrics displayed
✅ Proper formatting
✅ Realistic values
✅ No "undefined" or "NaN"
```

#### Test 5: Technical Indicators
```
Check:
- SMA 20
- SMA 50
- Trend (bullish/bearish)
- Market Cap

Expected:
✅ All indicators shown
✅ Proper calculations
✅ Visual badges
✅ Color coding
```

---

### 3. Prediction Panel Testing

#### Test 1: Prediction Display
```
Steps:
1. View Prediction Panel
2. Check prediction data

Expected:
✅ Current price shown
✅ 7-day forecast displayed
✅ Dates for each prediction
✅ Confidence scores
✅ Trend indicator
```

#### Test 2: Prediction Chart
```
Steps:
1. View the dual-line chart
2. Hover over data points

Expected:
✅ Blue line (actual prices)
✅ Purple dashed line (predictions)
✅ Smooth transition between lines
✅ Tooltip shows values
✅ Legend displayed
```

#### Test 3: Model Metrics
```
Check:
- Accuracy percentage
- MSE (Mean Squared Error)
- MAE (Mean Absolute Error)
- Confidence level

Expected:
✅ All metrics displayed
✅ Realistic values (accuracy 80-95%)
✅ Proper formatting
✅ Visual indicators
```

---

### 4. News Panel Testing

#### Test 1: Sentiment Overview
```
Steps:
1. View News Panel
2. Check sentiment badge

Expected:
✅ Overall sentiment shown (POSITIVE/NEGATIVE/NEUTRAL)
✅ Color-coded badge
✅ Sentiment score displayed
```

#### Test 2: Sentiment Distribution Chart
```
Steps:
1. View pie chart
2. Hover over segments

Expected:
✅ Three segments (positive/negative/neutral)
✅ Color coding (green/red/gray)
✅ Tooltip shows counts
✅ Legend displayed
```

#### Test 3: Article List
```
Steps:
1. View recent articles
2. Check article details

Expected:
✅ 3-5 articles displayed
✅ Title and description
✅ Source name
✅ Publication date
✅ Sentiment icon (👍/👎/➖)
✅ External link icon
```

---

### 5. Portfolio Panel Testing

#### Test 1: Portfolio Overview
```
Check:
- Total Value
- Invested Amount
- Profit/Loss
- P/L Percentage
- Risk Level

Expected:
✅ All values displayed
✅ Proper formatting (₹ symbol)
✅ Color coding (green/red for P/L)
✅ Risk badge (LOW/MEDIUM/HIGH)
```

#### Test 2: Allocation Pie Chart
```
Steps:
1. View allocation chart
2. Hover over segments

Expected:
✅ Multiple colored segments
✅ Stock symbols on segments
✅ Percentage labels
✅ Tooltip shows details
✅ Legend with colors
```

#### Test 3: Performance Chart
```
Steps:
1. View performance line chart
2. Hover over data points

Expected:
✅ 30-day history
✅ Smooth line
✅ Tooltip shows date and value
✅ Green line (profit trend)
```

#### Test 4: Holdings Table
```
Check each row:
- Symbol
- Allocation %
- Amount
- Current Value
- P/L

Expected:
✅ All holdings listed
✅ Proper alignment
✅ Color-coded P/L
✅ Hover effect on rows
✅ Color dots matching pie chart
```

---

### 6. Alerts Panel Testing

#### Test 1: Alert Display
```
Steps:
1. View Alerts Panel
2. Check alert list

Expected:
✅ 3+ demo alerts shown
✅ Different alert types
✅ Color-coded borders
✅ Icons for each type
✅ Timestamps
```

#### Test 2: Alert Types
```
Check for:
- Price alerts (blue)
- Opportunities (green)
- Warnings (yellow)
- Errors (red)

Expected:
✅ Different colors
✅ Appropriate icons
✅ Clear messages
✅ Stock symbols
```

#### Test 3: Alert Interactions
```
Steps:
1. Click X button on alert
2. Observe behavior

Expected:
✅ Alert disappears
✅ Smooth animation
✅ Count updates
✅ No errors
```

#### Test 4: Alert Summary
```
Check:
- Total count
- Unread count
- Opportunities count

Expected:
✅ Correct counts
✅ Visual cards
✅ Color coding
✅ Updates on dismiss
```

---

### 7. Header Testing

#### Test 1: Branding
```
Check:
- Logo/icon
- App name
- Tagline

Expected:
✅ Gradient icon visible
✅ "AI Financial Copilot" displayed
✅ Tagline shown
✅ Proper styling
```

#### Test 2: Market Status
```
Check:
- Market status indicator
- Status text

Expected:
✅ Green dot for "Market Open"
✅ Status text visible
✅ Icon displayed
```

#### Test 3: Top Stocks Ticker
```
Check:
- 3 stock symbols
- Price changes

Expected:
✅ Symbols displayed
✅ Percentage changes shown
✅ Color coding (green/red)
✅ Updates periodically
```

---

## 🔧 API Testing

### Using Browser (Manual)

#### Test 1: Market Overview
```
URL: http://localhost:8000/api/market/overview
Method: GET

Expected Response:
{
  "stocks": [...],
  "market_status": "open",
  "last_updated": "2026-04-09T10:30:00Z"
}
```

#### Test 2: Stock Data
```
URL: http://localhost:8000/api/stocks/AAPL
Method: GET

Expected Response:
{
  "symbol": "AAPL",
  "current_price": 175.50,
  "change": 2.30,
  ...
}
```

#### Test 3: Prediction
```
URL: http://localhost:8000/api/stocks/AAPL/prediction
Method: GET

Expected Response:
{
  "symbol": "AAPL",
  "predictions": [...],
  "trend": "upward",
  ...
}
```

### Using API Docs (Interactive)

```
Steps:
1. Open http://localhost:8000/docs
2. Expand any endpoint
3. Click "Try it out"
4. Fill parameters
5. Click "Execute"

Expected:
✅ Request sent successfully
✅ Response code 200
✅ Valid JSON response
✅ No errors
```

---

## 🐛 Error Testing

### Test 1: Invalid Stock Symbol
```
Query: "Analyze INVALID123"

Expected:
✅ Graceful error handling
✅ Fallback to demo data
✅ User-friendly message
✅ No app crash
```

### Test 2: Network Error
```
Steps:
1. Stop backend server
2. Try chat query

Expected:
✅ Error toast notification
✅ "Failed to get response" message
✅ App remains functional
✅ Can retry after restart
```

### Test 3: Empty Input
```
Steps:
1. Click send with empty input

Expected:
✅ Send button disabled
✅ No request sent
✅ No errors
```

---

## 📱 Responsive Testing

### Desktop (1920x1080)
```
Check:
✅ 3-column layout
✅ All panels visible
✅ Charts properly sized
✅ No horizontal scroll
```

### Tablet (768x1024)
```
Check:
✅ 2-column layout
✅ Panels stack properly
✅ Charts responsive
✅ Touch-friendly buttons
```

### Mobile (375x667)
```
Check:
✅ Single column layout
✅ Vertical stacking
✅ Charts scale down
✅ Touch interactions work
```

---

## ⚡ Performance Testing

### Load Time
```
Expected:
✅ Initial load < 3 seconds
✅ Chat response < 2 seconds
✅ Chart render < 1 second
✅ Smooth animations (60fps)
```

### Memory Usage
```
Check browser DevTools:
✅ Memory < 200MB
✅ No memory leaks
✅ Stable over time
```

---

## ✅ Testing Checklist

### Backend
- [ ] Server starts without errors
- [ ] All endpoints respond
- [ ] API docs accessible
- [ ] CORS configured
- [ ] Error handling works

### Frontend
- [ ] App loads successfully
- [ ] All components render
- [ ] Charts display correctly
- [ ] Animations smooth
- [ ] No console errors

### Features
- [ ] Chat works
- [ ] Stock data displays
- [ ] Predictions show
- [ ] News loads
- [ ] Portfolio displays
- [ ] Alerts show

### Integration
- [ ] Frontend connects to backend
- [ ] API calls succeed
- [ ] Data flows correctly
- [ ] State updates properly

### UX
- [ ] Responsive design works
- [ ] Dark theme consistent
- [ ] Loading states show
- [ ] Error messages clear
- [ ] Interactions smooth

---

## 🎯 Test Results Template

```
Test Date: ___________
Tester: ___________

Feature: ___________
Status: ✅ Pass / ❌ Fail
Notes: ___________

Issues Found:
1. ___________
2. ___________

Screenshots: ___________
```

---

## 🚀 Automated Testing (Future)

### Backend Tests
```bash
cd backend
pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

### E2E Tests
```bash
npm run test:e2e
```

---

## 📊 Expected Test Coverage

- Backend: 80%+ coverage
- Frontend: 70%+ coverage
- Integration: 90%+ coverage
- E2E: Key user flows

---

Happy Testing! 🧪✅
