from fastapi import FastAPI
from fastapi.responses import JSONResponse
import uvicorn

app = FastAPI()


@app.get("/health")
async def health_check():
    return JSONResponse(
        content={
            "service": "LLM",
            "message": "healthy",
            "status": "success",
            "version": "1.0.0",
        }
    )


@app.get("/health/nova")
async def health_check():
    return JSONResponse(
        content={
            "service": "nova",
            "message": "healthy",
            "status": "success",
            "version": "1.0.0",
        }
    )


@app.get("/health/leonardo")
async def health_check():
    return JSONResponse(
        content={
            "service": "leonardo",
            "message": "healthy",
            "status": "success",
            "version": "1.0.0",
        }
    )


@app.get("/health/devo")
async def health_check():
    return JSONResponse(
        content={
            "service": "devo",
            "message": "healthy",
            "status": "success",
            "version": "1.0.0",
        }
    )


@app.get("/health/omega")
async def health_check():
    return JSONResponse(
        content={
            "service": "omega",
            "message": "healthy",
            "status": "success",
            "version": "1.0.0",
        }
    )


@app.get("/health/buzz")
async def health_check():
    return JSONResponse(
        content={
            "service": "buzz",
            "message": "healthy",
            "status": "success",
            "version": "1.0.0",
        }
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000, reload=False)
