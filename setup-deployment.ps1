# Setup Deployment Repository Script
Write-Host "🚀 Setting up WebOnly Deployment Repository..." -ForegroundColor Green

# Create directories
Write-Host "📁 Creating directory structure..." -ForegroundColor Yellow
if (Test-Path "api") { Remove-Item -Path "api" -Recurse -Force }
if (Test-Path "frontend") { Remove-Item -Path "frontend" -Recurse -Force }
New-Item -ItemType Directory -Force -Path "api"
New-Item -ItemType Directory -Force -Path "frontend"

# Copy API files
Write-Host "📦 Copying API files..." -ForegroundColor Yellow
Copy-Item -Path "../webonlyapi/WebOnlyAPI/*" -Destination "./api/" -Recurse -Force

# Copy Frontend files  
Write-Host "🎨 Copying Frontend files..." -ForegroundColor Yellow
Copy-Item -Path "../webonly/*" -Destination "./frontend/" -Recurse -Force

# Initialize Git repository
Write-Host "🔧 Initializing Git repository..." -ForegroundColor Yellow
git init
git add .
git commit -m "Initial deployment setup"

Write-Host "✅ Deployment repository setup complete!" -ForegroundColor Green
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Create a new repository on GitHub" -ForegroundColor White
Write-Host "2. Push this code to GitHub" -ForegroundColor White
Write-Host "3. Connect Railway to your GitHub repository" -ForegroundColor White
Write-Host "4. Deploy!" -ForegroundColor White
