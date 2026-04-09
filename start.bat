@echo off
echo Starting AI Financial Copilot...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed. Please install Python 3.9 or higher.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Please install Node.js 18 or higher.
    pause
    exit /b 1
)

echo Prerequisites check passed
echo.

REM Backend setup
echo Setting up backend...
cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat

if not exist ".env" (
    echo Creating .env file from example...
    copy .env.example .env
    echo Please edit backend\.env and add your API keys
)

echo Installing Python dependencies...
pip install -q -r requirements.txt

echo Backend setup complete
echo.

REM Frontend setup
echo Setting up frontend...
cd ..\frontend

if not exist "node_modules" (
    echo Installing Node dependencies...
    call npm install
)

echo Frontend setup complete
echo.

REM Start services
echo Starting services...
echo.

REM Start backend
cd ..\backend
start "Backend" cmd /k "venv\Scripts\activate.bat && python run.py"

REM Wait for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
cd ..\frontend
start "Frontend" cmd /k "npm run dev"

echo.
echo Services started!
echo.
echo Frontend: http://localhost:3000
echo Backend: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Close the terminal windows to stop the services
echo.

pause
