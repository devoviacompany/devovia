# Use official Python slim image for a smaller footprint
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 
EXPOSE 5002

# Command to run the application 
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port 5002"]