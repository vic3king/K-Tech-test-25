#!/bin/bash

# Make script executable
chmod +x "$0"

# Kill any existing processes
lsof -ti:3000,4000 | xargs kill -9 2>/dev/null

# Check and setup backend
if [ -d "backend" ]; then
  cd backend
  echo "Installing backend dependencies..."
  npm install
  npm run start:dev &
else
  echo "Error: backend directory not found"
  exit 1
fi

sleep 3

# Check and setup frontend
cd ..
if [ -d "frontend" ]; then
  cd frontend
  echo "Installing frontend dependencies..."
  npm install
  npm run dev &
else
  echo "Error: frontend directory not found"
  exit 1
fi

# Keep script running until Ctrl+C
trap 'kill $(jobs -p)' EXIT
wait
