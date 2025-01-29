async function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  if (userInput.trim() === "") return;

  appendMessage("user", userInput);

  const response = await getBotResponse(userInput);
  appendMessage("bot", response);

  document.getElementById("userInput").value = "";
}

async function getBotResponse(userInput) {
  const apiKey = "sk-proj-8INJIH8oeEeUkUzxDt3rT3BlbkFJGIUWXFOMZr6cOzUMkw6v";
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "davinci-codex", 
      prompt: userInput,
      max_tokens: 50
    })
  });

  const responseData = await response.json();
  console.log(responseData); // Log the response data
  return responseData.choices[0].text.trim();
}


function appendMessage(role, content) {
  const chatMessages = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(role + "-message");
  messageDiv.textContent = content;
  chatMessages.appendChild(messageDiv);
}








/*import { config } from "dotenv"
config()

import OpenAI from "openai"
import readline from "readline"

const openai = new OpenAI({
    apiKey: process.env.API_KEY
})

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

userInterface.prompt()
userInterface.on("line", async input => {
    const res = await openai
    .chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: input}],
    })
    console.log(res.choices[0].message.content)
    userInterface.prompt()
}) */