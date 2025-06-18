const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

const disasterRoutes = require('./routes/disasters');
const socialRoutes = require('./routes/socialMedia');
const geocodeRoutes = require('./routes/geocode');
const verifyImageRoutes = require('./routes/verifyImage');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.use('/disasters', disasterRoutes);
app.use('/social-media', socialRoutes);
app.use('/geocode', geocodeRoutes);
app.use('/verify-image', verifyImageRoutes);

io.on('connection', socket => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
});

app.set('socketio', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
