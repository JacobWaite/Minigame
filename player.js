class player {
    constructor(game, x, y) {
        Object.assign(this, {game,x,y});
        this.currentHand = [];
        this.turn = false;
    }

    update() {

    }

    draw(ctx) {
        ctx.strokeStyle = "blue";
        for(let i = 0; i < this.currentHand.length; i++) {
            ctx.strokeRect(306+i*75, 740, 70, 100);
            ctx.drawImage(this.currentHand[i].cardImage, this.currentHand[i].x, this.currentHand[i].y, this.currentHand[i].width, 
                this.currentHand[i].height, 300+((i*75)+15), 750, this.currentHand[i].width*1.5, this.currentHand[i].height*1.5); 
        }
    
    }

    canPlay(card) {
        //if a card in the hand has the same color or number as the input card, return true
        //if the player possesses a wild or a draw 4, return true
        //else return false
    }

    play() {
        //pick a valid card at random to play
    }
}