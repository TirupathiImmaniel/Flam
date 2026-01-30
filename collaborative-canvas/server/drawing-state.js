class DrawingState {
    constructor() {
        this.history = []; // Array of completed stroke objects
    }
    addStroke(stroke) {
        this.history.push(stroke);
    }
    undo() {
        return this.history.pop(); // Removes the last action globally
    }
    getState() {
        return this.history;
    }
}
module.exports = DrawingState;