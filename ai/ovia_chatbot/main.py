from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import random
import json
from pathlib import Path

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
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}. Train the model first.")

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

@app.post("/chat")
async def chat(payload: dict):
    message = payload.get("message", "").strip()
    if not message:
        raise HTTPException(status_code=400, detail="Missing 'message' in request body")

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
                response = random.choice(intent["responses"]) if intent.get("responses") else None
                break
        if response is None:
            response = "I do not understand..."
    else:
        response = "I do not understand..."

    return JSONResponse(
        content={
            "bot": bot_name,
            "intent": tag,
            "confidence": round(confidence, 4),
            "reply": response,
        }
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5050, reload=False)
