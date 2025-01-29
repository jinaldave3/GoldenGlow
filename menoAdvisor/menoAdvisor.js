function sendMessage() {
    var userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") {
        return; // Do nothing if input is empty
    }

    // Display the user's message in the chat
    displayMessage(userInput, "user");

    // Clear the input field after sending the message
    document.getElementById("userInput").value = "";

    // Scroll to the bottom of the chat messages container
    scrollToBottom();
    
    console.log("Sending message to ChatGPT:", userInput); // Log the message being sent to ChatGPT
    
    // Send the user message to ChatGPT
    sendToChatGPT(userInput);
}

async function sendToChatGPT(message) {
    // Construct the request to the OpenAI API
    var apiUrl = "https://api.openai.com/v1/completions";
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + apiKey);

    var body = JSON.stringify({
        "model": "text-davinci-003", // Example model, replace with your desired model
        "prompt": message,
        "max_tokens": 150 // Example token limit, adjust as needed
    });

    try {
        // Send the request to the OpenAI API
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: body
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Handle the response from the OpenAI API
        var botResponse = data.choices[0].text;
        // Display the bot's response in the chat
        displayMessage(botResponse, "bot");
        // Scroll to the bottom of the chat messages container
        scrollToBottom();
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayMessage(message, sender) {
    // Create a new message element
    var messageContainer = document.createElement("div");
    messageContainer.className = "message " + sender;
    var messageText = document.createTextNode(message);
    messageContainer.appendChild(messageText);
    // Append the message to the chat messages container
    document.getElementById("chatMessages").appendChild(messageContainer);
}

function scrollToBottom() {
    // Scroll to the bottom of the chat messages container
    var chatMessages = document.getElementById("chatMessages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event listener for pressing Enter key in input field
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
