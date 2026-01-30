const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const DrawingState = require('./drawing-state');

const state = new DrawingState();
app.use(express.static(path.join(__dirname, '../client')));

io.on('connection', (socket) => {
    // Sync new user with existing drawing
    socket.emit('init', state.getState());

    socket.on('draw-step', (stroke) => {
        socket.broadcast.emit('remote-draw', stroke);
    });

    socket.on('stroke-end', (stroke) => {
        state.addStroke(stroke);
        io.emit('sync', state.getState());
    });

    socket.on('undo', () => {
        state.undo();
        io.emit('sync', state.getState());
    });
});

http.listen(3000, () => console.log('Listening on http://localhost:3000'));