let isDrawing = false;
let currentStroke = null;
let tool = 'brush';

initCanvas();

function getPos(e) {
    return { x: e.clientX, y: e.clientY - 60 };
}

pCanvas.onmousedown = (e) => {
    isDrawing = true;
    currentStroke = {
        type: tool,
        color: tool === 'eraser' ? '#ffffff' : document.getElementById('colorPicker').value,
        lineWidth: document.getElementById('widthPicker').value,
        points: [getPos(e)]
    };
};

pCanvas.onmousemove = (e) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    currentStroke.points.push(pos);
    
    // Smooth raw canvas drawing
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    drawLine(pCtx, currentStroke);
    
    socket.emit('draw-step', currentStroke);
};

window.onmouseup = () => {
    if (isDrawing) {
        socket.emit('stroke-end', currentStroke);
        isDrawing = false;
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    }
};

function setTool(t) { tool = t; }