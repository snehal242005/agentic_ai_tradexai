# Visual Showcase

## AI Financial Copilot - What You'll See

This document describes the visual appearance and user experience of the application.

---

## 🎨 Color Palette

### Dark Mode Theme
```
Background Colors:
├── Primary Background: #0a0e1a (Deep blue-black)
├── Card Background: #131827 (Dark gray-blue)
├── Border Color: #1e2537 (Subtle gray)
└── Hover State: #1a2035 (Slightly lighter)

Accent Colors:
├── Blue: #3b82f6 (Primary actions, links)
├── Green: #10b981 (Profit, positive, buy)
├── Red: #ef4444 (Loss, negative, sell)
├── Purple: #8b5cf6 (Predictions, AI)
└── Yellow: #f59e0b (Warnings, alerts)

Text Colors:
├── Primary: #e5e7eb (Main text)
├── Secondary: #9ca3af (Descriptions)
└── Tertiary: #6b7280 (Subtle text)
```

---

## 📱 Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                          HEADER                                 │
│  [Logo] AI Financial Copilot    [Market Status] [Top Stocks]   │
└─────────────────────────────────────────────────────────────────┘
┌──────────────────┬──────────────────────────────────────────────┐
│                  │                                              │
│   CHAT PANEL     │        STOCK DASHBOARD                       │
│                  │   ┌────────────────────────────────────┐     │
│  [AI Avatar]     │   │ AAPL  $175.50  +2.30 (+1.33%)     │     │
│  Hello! I'm...   │   │ [1d][1w][1mo][3mo][1y]            │     │
│                  │   └────────────────────────────────────┘     │
│  [User Avatar]   │   ┌────────────────────────────────────┐     │
│  Which stocks... │   │                                    │     │
│                  │   │        [Area Chart]                │     │
│  [AI Avatar]     │   │                                    │     │
│  AAPL: BUY       │   └────────────────────────────────────┘     │
│  Strong buy...   │   [Volume] [52W High] [52W Low] [P/E]       │
│                  │                                              │
│  [Input Field]   ├──────────────────────────────────────────────┤
│  [Send Button]   │        PREDICTION PANEL                      │
│                  │   ┌────────────────────────────────────┐     │
│  [Suggestions]   │   │ Price Prediction  [UPWARD TREND]  │     │
│                  │   │                                    │     │
│                  │   │   [Dual Line Chart]                │     │
│                  │   │   Blue: Actual | Purple: Predicted │     │
│                  │   └────────────────────────────────────┘     │
│                  │   [Accuracy: 87%] [MSE] [MAE]               │
│                  │                                              │
│                  ├──────────────────────────────────────────────┤
│                  │        NEWS SENTIMENT PANEL                  │
│                  │   ┌────────────────────────────────────┐     │
│                  │   │ News Sentiment  [POSITIVE]         │     │
│                  │   │                                    │     │
│                  │   │ [Pie Chart]    [Article List]     │     │
│                  │   │  Positive: 8   • Article 1        │     │
│                  │   │  Negative: 2   • Article 2        │     │
│                  │   │  Neutral: 3    • Article 3        │     │
│                  │   └────────────────────────────────────┘     │
└──────────────────┴──────────────────────────────────────────────┘
┌──────────────────────────────────────┬──────────────────────────┐
│     PORTFOLIO PANEL                  │    ALERTS PANEL          │
│  ┌────────────────────────────────┐  │  ┌────────────────────┐  │
│  │ Portfolio Overview             │  │  │ Alerts & Notif.    │  │
│  │ Total: ₹100,000  +5.2%        │  │  │ [3 Unread]         │  │
│  │                                │  │  │                    │  │
│  │ [Pie Chart]  [Line Chart]     │  │  │ [🔔] AAPL Alert   │  │
│  │  Allocation   Performance      │  │  │ Price reached...   │  │
│  │                                │  │  │                    │  │
│  │ Holdings Table:                │  │  │ [✓] TSLA Opp.     │  │
│  │ AAPL  30%  ₹30,000  +5%       │  │  │ Buy opportunity... │  │
│  │ GOOGL 25%  ₹25,000  +3%       │  │  │                    │  │
│  │ MSFT  25%  ₹25,000  +7%       │  │  │ [⚠] GOOGL Warning │  │
│  │ TCS   20%  ₹20,000  +2%       │  │  │ Dropped 3%...      │  │
│  └────────────────────────────────┘  │  └────────────────────┘  │
└──────────────────────────────────────┴──────────────────────────┘
```

---

## 🎭 Component Visuals

### Header Component
```
┌─────────────────────────────────────────────────────────────────┐
│ [🔷] AI Financial Copilot          [●] Market Open  AAPL +1.3% │
│      Intelligent Investment Assistant                GOOGL -0.8%│
└─────────────────────────────────────────────────────────────────┘
```
- Gradient logo (blue to purple)
- Market status with green dot
- Top 3 stocks ticker with color-coded changes

### Chat Panel
```
┌─────────────────────────────────┐
│ [🤖] AI Assistant               │
├─────────────────────────────────┤
│                                 │
│ [🤖] Hello! I'm your AI         │
│      Financial Copilot...       │
│                                 │
│      [👤] Which stocks should   │
│           I buy?                │
│                                 │
│ [🤖] **AAPL** (₹175.50): BUY   │
│      Strong buy signal...       │
│      ┌─────────────────────┐   │
│      │ AAPL        [BUY]   │   │
│      │ ₹175.50             │   │
│      └─────────────────────┘   │
│                                 │
│ [⚙️] Analyzing...              │
│                                 │
├─────────────────────────────────┤
│ [Ask about stocks...]  [Send]   │
│ [Which stocks?] [Predict AAPL]  │
└─────────────────────────────────┘
```
- Bot icon (blue)
- User icon (white)
- Message bubbles
- Recommendation cards
- Loading indicator
- Input field
- Quick suggestions

### Stock Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│ AAPL                                                        │
│ ₹175.50  [↗] +2.30 (+1.33%)                                │
│                                                             │
│ [1d] [1w] [1mo] [3mo] [1y]                                 │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐   │
│ │                                                     │   │
│ │     180 ┤                                    ╱─    │   │
│ │         │                              ╱────╱      │   │
│ │     175 ┤                        ╱────╱            │   │
│ │         │                  ╱────╱                  │   │
│ │     170 ┤            ╱────╱                        │   │
│ │         │      ╱────╱                              │   │
│ │     165 ┤╱────╱                                    │   │
│ │         └────────────────────────────────────────  │   │
│ │         Apr 1    Apr 10    Apr 20    Apr 30       │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│ │ Volume   │ │ 52W High │ │ 52W Low  │ │ P/E Ratio│     │
│ │ 50M      │ │ ₹198.23  │ │ ₹124.17  │ │ 28.5     │     │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
│                                                             │
│ Technical Indicators:                                       │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ SMA 20: ₹172.45    SMA 50: ₹168.90                 │   │
│ │ Trend: [BULLISH]   Market Cap: $2.8T               │   │
│ └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```
- Large price display
- Color-coded change indicator
- Period selector buttons
- Gradient area chart
- Stats grid
- Technical indicators panel

### Prediction Panel
```
┌─────────────────────────────────────────────────────────────┐
│ [🎯] Price Prediction              [↗ UPWARD TREND]        │
│      AI-powered 7-day forecast                              │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐   │
│ │                                                     │   │
│ │     180 ┤                              ╱ ╱ ╱ ╱     │   │
│ │         │                            ╱ ╱ ╱ ╱       │   │
│ │     175 ┤────────────────────────────             │   │
│ │         │                                           │   │
│ │     170 ┤                                           │   │
│ │         └────────────────────────────────────────  │   │
│ │         Past ────────────────→ Future              │   │
│ │         ━━━━ Actual    ┈┈┈┈ Predicted              │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│ │ Current  │ │ 7-Day    │ │ Accuracy │ │Confidence│     │
│ │ ₹175.50  │ │ ₹184.60  │ │ 87.5%    │ │ HIGH     │     │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
│                                                             │
│ Model Performance: MSE: 2.3  MAE: 1.8  Accuracy: 87.5%    │
└─────────────────────────────────────────────────────────────┘
```
- Trend badge (green/red)
- Dual-line chart (solid + dashed)
- Metrics cards
- Model performance stats

### News Panel
```
┌─────────────────────────────────────────────────────────────┐
│ [📰] News Sentiment Analysis           [POSITIVE]          │
│      Real-time market sentiment                             │
│                                                             │
│ ┌──────────────────┐  ┌──────────────────────────────┐    │
│ │                  │  │ Recent Articles:             │    │
│ │   [Pie Chart]    │  │                              │    │
│ │                  │  │ ┌──────────────────────────┐ │    │
│ │   Positive: 60%  │  │ │ [👍] AAPL Reports Strong │ │    │
│ │   Negative: 20%  │  │ │      Earnings            │ │    │
│ │   Neutral: 20%   │  │ │      Financial Times     │ │    │
│ │                  │  │ └──────────────────────────┘ │    │
│ │                  │  │                              │    │
│ │                  │  │ ┌──────────────────────────┐ │    │
│ │                  │  │ │ [👍] Analysts Upgrade    │ │    │
│ │                  │  │ │      AAPL Rating         │ │    │
│ │                  │  │ │      Bloomberg           │ │    │
│ │                  │  │ └──────────────────────────┘ │    │
│ └──────────────────┘  └──────────────────────────────┘    │
│                                                             │
│ Latest News:                                                │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ [👍] AAPL Reports Strong Q4 Earnings                │   │
│ │      Financial Times • 2 hours ago                  │   │
│ │      Apple announced quarterly earnings that...     │   │
│ └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```
- Sentiment badge (color-coded)
- Pie chart (green/red/gray)
- Article cards with icons
- Source and timestamp
- External link icons

### Portfolio Panel
```
┌─────────────────────────────────────────────────────────────┐
│ [💼] Portfolio Overview                                     │
│      Your investment allocation                             │
│                                                             │
│ Total Value: ₹100,000  (+5.2% / +₹5,000)                  │
│                                                             │
│ ┌──────────────────┐  ┌──────────────────────────────┐    │
│ │                  │  │                              │    │
│ │   [Pie Chart]    │  │   [Line Chart]               │    │
│ │                  │  │                              │    │
│ │   AAPL: 30%      │  │   Performance over time      │    │
│ │   GOOGL: 25%     │  │                              │    │
│ │   MSFT: 25%      │  │   ╱─────                     │    │
│ │   TCS: 20%       │  │  ╱                           │    │
│ │                  │  │ ╱                            │    │
│ └──────────────────┘  └──────────────────────────────┘    │
│                                                             │
│ Holdings:                                                   │
│ ┌─────────────────────────────────────────────────────┐   │
│ │ Symbol  Alloc%  Amount    Value     P/L             │   │
│ │ ● AAPL   30%   ₹30,000   ₹31,500   +5.0%          │   │
│ │ ● GOOGL  25%   ₹25,000   ₹25,750   +3.0%          │   │
│ │ ● MSFT   25%   ₹25,000   ₹26,750   +7.0%          │   │
│ │ ● TCS    20%   ₹20,000   ₹20,400   +2.0%          │   │
│ └─────────────────────────────────────────────────────┘   │
│                                                             │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                   │
│ │ Invested │ │ Current  │ │ Risk     │                   │
│ │ ₹95,000  │ │ ₹100,000 │ │ [MEDIUM] │                   │
│ └──────────┘ └──────────┘ └──────────┘                   │
└─────────────────────────────────────────────────────────────┘
```
- Total value with P/L
- Allocation pie chart
- Performance line chart
- Holdings table with color dots
- Summary stats

### Alerts Panel
```
┌─────────────────────────────────────┐
│ [🔔] Alerts & Notifications    [3]  │
│      Real-time market updates       │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [ℹ️] AAPL                  [●]  │ │
│ │ Price reached target of $175    │ │
│ │ 2 hours ago                [×]  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [✓] TSLA                   [●]  │ │
│ │ Buy opportunity detected        │ │
│ │ 5 hours ago                [×]  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ [⚠] GOOGL                       │ │
│ │ Dropped 3% - Review position    │ │
│ │ 1 day ago                  [×]  │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐            │
│ │Total│ │Unread│ │Opps │            │
│ │  3  │ │  2   │ │  1  │            │
│ └─────┘ └─────┘ └─────┘            │
└─────────────────────────────────────┘
```
- Badge with unread count
- Alert cards (color-coded borders)
- Icons by type
- Dismiss buttons
- Summary stats

---

## 🎬 Animations

### Page Load
```
1. Fade in header (0.3s)
2. Slide up chat panel (0.5s)
3. Fade in dashboard (0.5s, delay 0.1s)
4. Fade in prediction (0.5s, delay 0.2s)
5. Fade in news (0.5s, delay 0.3s)
6. Fade in portfolio (0.5s, delay 0.4s)
7. Fade in alerts (0.5s, delay 0.5s)
```

### Chat Messages
```
- New message: Slide up + fade in (0.3s)
- Bot typing: Pulsing dots animation
- Recommendation cards: Stagger fade in (0.1s each)
```

### Charts
```
- Area chart: Draw from left to right (1s)
- Line chart: Draw along path (1s)
- Pie chart: Rotate segments in (0.8s)
```

### Interactions
```
- Button hover: Scale 1.05 + brightness increase
- Card hover: Lift shadow + border glow
- Input focus: Border color change + ring
- Alert dismiss: Slide out left + fade (0.3s)
```

---

## 📱 Responsive Breakpoints

### Desktop (1920px+)
```
┌─────────────────────────────────────────────────────────────┐
│                         Header                              │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│     Chat     │              Dashboard                       │
│   (33.33%)   │              (66.67%)                        │
│              │                                              │
├──────────────┴──────────────────────────────────────────────┤
│                    Portfolio (66.67%)    │  Alerts (33.33%) │
└──────────────────────────────────────────┴──────────────────┘
```

### Tablet (768px - 1024px)
```
┌─────────────────────────────────────────┐
│              Header                     │
├─────────────────────────────────────────┤
│              Chat                       │
├─────────────────────────────────────────┤
│              Dashboard                  │
├─────────────────────────────────────────┤
│              Prediction                 │
├─────────────────────────────────────────┤
│              News                       │
├─────────────────────────────────────────┤
│              Portfolio                  │
├─────────────────────────────────────────┤
│              Alerts                     │
└─────────────────────────────────────────┘
```

### Mobile (375px - 767px)
```
┌───────────────────┐
│     Header        │
├───────────────────┤
│     Chat          │
├───────────────────┤
│   Dashboard       │
├───────────────────┤
│   Prediction      │
├───────────────────┤
│     News          │
├───────────────────┤
│   Portfolio       │
├───────────────────┤
│    Alerts         │
└───────────────────┘
```

---

## 🎨 Visual States

### Loading States
```
┌─────────────────────────────────┐
│ ▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░  │ (Shimmer animation)
│ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░  │
│ ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░  │
└─────────────────────────────────┘
```

### Empty States
```
┌─────────────────────────────────┐
│           [Icon]                │
│     No data available           │
│   Try adding some stocks        │
└─────────────────────────────────┘
```

### Error States
```
┌─────────────────────────────────┐
│           [⚠️]                  │
│   Failed to load data           │
│      [Retry Button]             │
└─────────────────────────────────┘
```

---

This visual showcase gives you a complete picture of what the AI Financial Copilot looks like! 🎨✨
