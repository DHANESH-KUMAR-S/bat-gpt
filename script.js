function appendMessage(content, sender) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    if (sender === 'user') {
        const img = document.createElement('img');
        img.src = '/static/logoo.jpeg';
        img.alt = 'Utman Logo';
        messageDiv.appendChild(img);
    }
    
    const messageText = document.createElement('span');
    messageText.textContent = content;
    messageDiv.appendChild(messageText);

    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;  // Auto-scroll to the bottom
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput.trim() === '') return;

    // Append user message
    appendMessage(userInput, 'user');

    // Send user message to backend
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        appendMessage(data.response, 'ai');  // Append AI response
    })
    .catch(error => console.error('Error:', error));

    // Clear the input field
    document.getElementById('userInput').value = '';
}