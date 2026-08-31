import base64
import os

from openai import OpenAI
from openai.types.chat import ChatCompletionMessageParam

# By default there is no API key for the local vLLM server.
# If you used a different port thatn 8000, you need to change it.
OPENAI_API_KEY = "EMPTY"
OPENAI_API_BASE = "http://localhost:8000/v1"

# The model must match the one that server was started with.
MODEL_PATH = "Qwen/Qwen3.5-4B"
# Image that is given as an input.
IMG_PATH = "path/to/image.png"


client = OpenAI(
    api_key=OPENAI_API_KEY,
    base_url=OPENAI_API_BASE,
)


# Encode the image to base64
def encode_image(image_path: str | os.PathLike) -> str:
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


messages: list[ChatCompletionMessageParam] = [
    {
        "role": "user",
        "content": [
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{encode_image(IMG_PATH)}"
                },
            },
            {
                "type": "text",
                "text": "Extract the table from this image.",
            },
        ],
    },
]


# Streaming the response so that it can be displayed in real time in the terminal.
stream = client.chat.completions.create(
    model=MODEL_PATH,
    messages=messages,
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="")

print()
