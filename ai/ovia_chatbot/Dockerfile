# Base image
FROM python:3.12-slim AS base

# Prevent Python from writing .pyc files and enable unbuffered stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install build/runtime deps minimally (if needed for some wheels)
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     build-essential \
#  && rm -rf /var/lib/apt/lists/*

# Copy only requirements first to leverage Docker layer caching
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download NLTK data to avoid runtime downloads
RUN python - <<'PY'
import nltk
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
PY

# Now copy the rest of the app
COPY . .

# Expose API port
EXPOSE 5050

# Default command: run the FastAPI app with uvicorn
# Using main:app so hot-reload is off (prod-like). Adjust workers if needed.
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5050"]