const express = require("express");
const cors = require("cors");
const setup = require("./database/mongoose");
const { Server } = require('socket.io');
const http = require('http');

const BACKEND_Core = process.env.BACKEND_CORE || 'http://localhost:3000';
const BACKEND_Port = process.env.BACKEND_PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const postAdminRoutes = require("./routes/postAdminRoutes");
const postAlumniRoutes = require("./routes/postAlumniRoutes");
const topicRoutes = require("./routes/topicRoutes");
const authentication = require("./routes/authenticationRoutes");
const questionaire = require("./routes/questionaireRoutes");
const admins = require("./routes/AdminRoutes");
const answerQuestion = require("./routes/answerQuestionRoutes");
const visitRoutes = require("./routes/visitRoutes");

const app = express();
const port = BACKEND_Port;

// Create an HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: BACKEND_Core, 
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO configuration
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for incoming messages
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);

    // Broadcast message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Middleware and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: [`${BACKEND_Core}`],
}));

app.use('/uploads', express.static('uploads'));
app.use('/users', userRoutes);
app.use('/postAdmins', postAdminRoutes);
app.use('/postAlumnis', postAlumniRoutes);
app.use('/topics', topicRoutes);
app.use('/authentication', authentication);
app.use('/questionaire', questionaire);
app.use('/answerQuestion', answerQuestion);
app.use('/admins', admins);
app.use("/visits", visitRoutes);

// Start the server
app.listen(port, async () => {
  await setup();
  console.log(`Server running on port ${port}`);
});