import asyncio
import json
import logging
import os
import sys
import nats
from dotenv import load_dotenv


load_dotenv()

logger = logging.getLogger("generative_ai")


def _configure_logging() -> None:
    """Configure console logging similar to uvicorn / NestJS style."""

    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter(
        "[%(asctime)s] [%(levelname)s] [generative_ai] %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    handler.setFormatter(formatter)

    logger.setLevel(logging.INFO)
    logger.handlers.clear()
    logger.addHandler(handler)


def _health_payload(service_name: str) -> dict:
    return {
        "service": service_name,
        "message": "healthy",
        "status": "success",
        "version": "1.0.0",
    }


async def start_nats_listener() -> None:
    """Connect to NATS and handle getGenerativeAIHealth requests from the API Gateway."""

    subject = '{"cmd":"getGenerativeAIHealth"}'

    # Read NATS URL from environment with a sensible default for local dev.
    nats_url = os.getenv("NATS_URL", "")

    logger.info("Starting Generative AI NATS microservice...")
    logger.info("Connecting to NATS at %s", nats_url)

    nc = await nats.connect(nats_url)
    logger.info("Connected to NATS")

    async def handle_get_ai_health(msg: nats.aio.msg.Msg) -> None:
        try:
            logger.info("Received request on subject %s", msg.subject)
            payload = _health_payload("Generative AI")
            await nc.publish(msg.reply, json.dumps(payload).encode("utf-8"))
            logger.info("Sent health response for Generative AI")
        except Exception as exc:  # noqa: BLE001
            logger.exception("Error while handling getGenerativeAIHealth request: %s", exc)

    await nc.subscribe(subject, cb=handle_get_ai_health)
    logger.info("Subscribed to subject %s", subject)
    logger.info("Generative AI NATS microservice is up and listening")

    # Keep the listener running indefinitely.
    while True:
        await asyncio.sleep(3600)


async def main() -> None:
    _configure_logging()
    logger.info("Bootstrapping Generative AI service (NATS-only mode)...")
    await start_nats_listener()


if __name__ == "__main__":
    asyncio.run(main())
