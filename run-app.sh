#!/bin/bash

# Make script executable
chmod +x "$0"

# Kill any existing processes
lsof -ti:3000,4000 | xargs kill -9 2>/dev/null

# Start backend
cd backend && npm run dev &

# Wait a moment for backend to start
sleep 3

# Start frontend
cd ../frontend && npm run dev &

# Keep script running until Ctrl+C
trap 'kill $(jobs -p)' EXIT
wait
