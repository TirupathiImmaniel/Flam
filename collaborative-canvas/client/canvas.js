const mCanvas = document.getElementById('mainCanvas');
const pCanvas = document.getElementById('previewCanvas');
const mCtx = mCanvas.getContext('2d');
const pCtx = pCanvas.getContext('2d');

function initCanvas() {
    mCanvas.width = pCanvas.width = window.innerWidth;
    mCanvas.height = pCanvas.height = window.innerHeight - 60;
}

function drawLine(ctx, stroke) {
    if (!stroke || stroke.points.length < 2) return;
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.lineWidth;
    
    // Eraser requirement
    ctx.globalCompositeOperation = stroke.type === 'eraser' ? 'destination-out' : 'source-over';
    
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
}

function redraw(history) {
    mCtx.clearRect(0, 0, mCanvas.width, mCanvas.height);
    history.forEach(stroke => drawLine(mCtx, stroke));
}