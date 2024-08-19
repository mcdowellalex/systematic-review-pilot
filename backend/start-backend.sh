#!/bin/bash

# Check if virtual environment directory exists
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# upgrade pip if need be
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies from requirements.txt
echo "Installing packages from requirements.txt..."
pip install -r requirements.txt


echo "Starting server..."
uvicorn server:app --reload