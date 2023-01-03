const socket = io();
// console.log("[Socket Object]", socket);

// The socket event that prints to the browser console everytime you connect to the socketIo server.
socket.on("connect", () => {
  console.log(`[Connected] Your ID is: ${socket.id}`);
});

// The socket event that handles the logic for incoming messages.
socket.on("message", (msg) => {
    // Log a message to the console.
    console.log("💬", msg);

    // Get the all-messages ul element
    const allMessages = document.getElementById("all-messages");

    // Create a li element
    const message = document.createElement('li');

    // Split the message string so we can access the id and message in seperate parts. Returns ['daMgMr0uMXILWlOZAAAB', ' My message...']
    const splitMessage = msg.split(":");


    // Create new span elements so we can style these elements in the browser.
    const username = document.createElement("span");
    const chatMessage = document.createElement("span");

    // Add the content to the span elements from the splitMessage array.
    username.textContent = splitMessage[0] + ":";
    chatMessage.textContent = splitMessage[1];

    // Add the spans to the message li element
    message.appendChild(username);
    message.appendChild(chatMessage);


    // Add the message the all-messages ul element
    allMessages.appendChild(message);

    // Scroll the window position to keep it in view of new messages.
    window.scrollTo(0, document.body.scrollHeight);
}); 


// The logic for submitting a chat message to the server
const form = document.getElementById("form");
const input = document.getElementById("input");

// Set an event listener for everytime the submit button is pushed
form.addEventListener("submit", (e) => {
  // Disables default action of the submit button
  e.preventDefault();

  // Check if we have a value in the input element.
  if (input.value) {
    // Send the data to the server.
    socket.emit("message", input.value);

    // Set the input box to blank as the message has been sent.
    input.value = "";
  }
});
