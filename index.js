const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const ejs = require("ejs");
const port = 3000;

// set the view engine to ejs
app.set("view engine", "ejs");

// The index.ejs route that is exposed.
app.get("/", (req, res) => {
  // Send data to the views. Using EJS.
  res.render("index", {
    title: "Socket Io Example",
    header: "My Socket IO Example",
  });
});

// Socket IO Events.
io.on("connection", (socket) => {
  // Prints to the server console everytime a user connects.
  console.log(`[Connection] ${socket.id}`);

  socket.on("message", (msg) => {
    console.log(`[Message] ${socket.id}: ${msg}`);

    // You could add any logic here such as a filter to stop bad messages!
    const formatedMessage = `${socket.id}: ${msg}`;

    // Broadcast the message back to all users.
    io.emit('message', formatedMessage);
  });

});


//   End of Socket IO events

// Serve the public folder directory to the web.
app.use(express.static("public"));

// Express server starts listening.
http.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
