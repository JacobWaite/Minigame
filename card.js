class card {
    constructor(game, color, value, cardImage, x, y, width, height) {
        Object.assign(this, {game, color, value, cardImage, x, y, width, height});
        
    }
    update() {

    }
    draw(ctx) {
        
    }
    toString() {
        return `Card: ${this.color} ${this.value}`;
    }
}