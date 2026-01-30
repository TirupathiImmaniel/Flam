const DrawingState = require('./drawing-state');

class RoomManager {
    constructor() {
        this.rooms = new Map();
    }
    getRoom(name) {
        if (!this.rooms.has(name)) {
            this.rooms.set(name, {
                state: new DrawingState(),
                users: {}
            });
        }
        return this.rooms.get(name);
    }
}
module.exports = new RoomManager();