const socket = io();

socket.on('init', (history) => redraw(history));
socket.on('sync', (history) => {
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    redraw(history);
});
socket.on('remote-draw', (stroke) => drawLine(pCtx, stroke));

function sendUndo() { socket.emit('undo'); }