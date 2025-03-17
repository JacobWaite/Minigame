class playablePlayer extends player {
    constructor(game, x, y) {
        super(game, x, y);
        console.log(`Playable Player created ${this}`);
        this.buttons = [];
        this.currentCard = null;
        this.drawButton = new button(this, 350, 350, 35, 55, 1.5);
        this.draw2 = false;
        this.cardsDrawn = 0;
        this.image = ASSET_MANAGER.getAsset("./topcard.png");
        
    }

    update() {
        //console.log(`Playable Player playing ${this}`);
        if(this.currentHand.length == 0) {
            this.game.manager.won = true;
        }
        if(!this.turn) {
            this.game.manager.started = false;
            this.buttons.forEach(element => {
                element.disable();
            });
            this.drawButton.disable();
        }
        if(this.turn) {
            this.buttons.forEach(element => {
                element.enable();
            });
            this.drawButton.enable();
        }
        if(this.canPlay(this.game.manager.getCurrentPlayingCard())) {
            this.drawButton.disable();
        }
        if(this.draw2) {
            this.buttons.forEach(element => {
                element.disable();
            });
            this.drawButton.enable();
        }
    }

    draw(ctx) {
        if(this.game.manager.won) {
            this.drawButton.disable();
            return;
        }
        for(let i = 0; i < this.currentHand.length; i++) {            
            ctx.strokeStyle = "green";
            this.buttons[i].draw(ctx);
            if(this.buttons[i].collide()) {
                ctx.strokeStyle = "red";
                this.buttons[i].draw(ctx);
            }
        }

        for(let i = 0; i < this.currentHand.length; i++) {            
            ctx.drawImage(this.currentHand[i].cardImage, this.currentHand[i].x, this.currentHand[i].y, this.currentHand[i].width, 
                this.currentHand[i].height, 100+((i*75)+15), 600, this.currentHand[i].width*1.5, this.currentHand[i].height*1.5); 
        }
        
        this.drawButton.draw(ctx);
        ctx.drawImage(this.image,350,350);
        if(this.drawButton.collide()) {
            ctx.strokeStyle = "red";
            this.drawButton.draw(ctx);
        }
        ctx.fillStyle = "black";
        ctx.font = "24px Arial";
        if(this.turn && !this.draw2) {
            ctx.fillText("Your Turn", ctx.canvas.width / 2 - 50, ctx.canvas.height - 125);
        }
        if(this.draw2) {
            ctx.fillText("You must draw 2 cards", ctx.canvas.width / 2 - 100, ctx.canvas.height - 125);
        }
        
        
        
    
    }

    canPlay(card) {
        //if a card in the hand has the same color or number as the input card, return true
        //if the player possesses a wild or a draw 4, return true
        //else return false
        let i = 0;
        let notFound = this.currentHand.length > 0;
        while(notFound) {
            if(this.currentHand[i].color == card.color || this.currentHand[i].value == card.value) {
                return true;
            }
            i ++;
            notFound = i < this.currentHand.length;

        }

        return false;
    }

    toString() {
        return `PlayablePlayer: ${this.currentHand}`;
    }


}