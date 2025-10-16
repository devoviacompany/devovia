from fastapi import FastAPI
from fastapi.responses import JSONResponse
import uvicorn

app = FastAPI()

@app.get("/health")
async def health_check():
    return JSONResponse(
        content={
            "service": "ovia chatbot",
            "message": "healthy",
            "status": "success",
            "version": "1.0.0",
        }
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5050, reload=False)
