from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import random
import json
from pathlib import Path
import time

import torch

from src.model.model import NeuralNet
from src.utils.nltk_utils import bag_of_words, tokenize

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

BASE_DIR = Path(__file__).resolve().parent
SRC_DIR = BASE_DIR / "src"
DATA_DIR = SRC_DIR / "data"
INTENTS_PATH = DATA_DIR / "intents.json"
MODEL_PATH = DATA_DIR / "data.pth"

with open(INTENTS_PATH, "r", encoding="utf-8") as json_data:
    intents = json.load(json_data)

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Model file not found at {MODEL_PATH}. Train the model first."
    )

checkpoint = torch.load(MODEL_PATH, map_location=device)

input_size = checkpoint["input_size"]
hidden_size = checkpoint["hidden_size"]
output_size = checkpoint["output_size"]
all_words = checkpoint["all_words"]
tags = checkpoint["tags"]
model_state = checkpoint["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "Ovia"


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


def infer(message: str):
    tokens = tokenize(message)
    X = bag_of_words(tokens, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    with torch.no_grad():
        output = model(X)
        _, predicted = torch.max(output, dim=1)
        probs = torch.softmax(output, dim=1)
        confidence = probs[0][predicted.item()].item()

    tag = tags[predicted.item()]

    if confidence > 0.75:
        response = None
        for intent in intents["intents"]:
            if tag == intent["tag"]:
                response = (
                    random.choice(intent["responses"])
                    if intent.get("responses")
                    else None
                )
                break
        if response is None:
            response = "I do not understand..."
    else:
        response = "I do not understand..."

    return {
        "bot": bot_name,
        "intent": tag,
        "confidence": round(confidence, 4),
        "reply": response,
    }


@app.post("/chat")
async def chat(payload: dict):
    message = payload.get("message", "").strip()
    if not message:
        raise HTTPException(status_code=400, detail="Missing 'message' in request body")
    result = infer(message)
    return JSONResponse(content=result)


@app.get("/chat/stream")
async def chat_stream(message: str, request: Request):
    # Server-Sent Events streaming of the reply, word by word
    result = infer(message)
    reply_text = result["reply"]

    def sse_event(data: dict) -> bytes:
        return f"data: {json.dumps(data, ensure_ascii=False)}\n\n".encode("utf-8")

    async def event_generator():
        # Send meta first
        yield sse_event(
            {
                "type": "meta",
                "bot": result["bot"],
                "intent": result["intent"],
                "confidence": result["confidence"],
            }
        )
        # Stream chunks
        buf = []
        for token in reply_text.split():
            buf.append(token)
            # Respect client disconnects
            if await request.is_disconnected():
                break
            yield sse_event({"type": "delta", "text": token + " "})
            await asyncio.sleep(0.03)
        # Final full message
        yield sse_event({"type": "final", "text": " ".join(buf).strip()})
        # End of stream
        yield b"event: end\ndata: {}\n\n"

    import asyncio  # local import to avoid unused when not streaming

    return StreamingResponse(event_generator(), media_type="text/event-stream")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5050, reload=False)
