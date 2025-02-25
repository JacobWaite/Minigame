class playablePlayer extends player {
    constructor(game, x, y) {
        super(game, x, y);
        console.log("playable player created");
        this.buttons = [];
        this.currentCard = null;
        this.drawButton = new button(this, 350, 350, 40, 70, 1.5);
        this.win = false;
        
    }

    update() {

        if(this.currentHand.length == 0) {
            this.win = true;
        }
    }

    draw(ctx) {
        for(let i = 0; i < this.currentHand.length; i++) {            
            ctx.drawImage(this.currentHand[i].cardImage, this.currentHand[i].x, this.currentHand[i].y, this.currentHand[i].width, 
                this.currentHand[i].height, 100+((i*75)+15), 600, this.currentHand[i].width*1.5, this.currentHand[i].height*1.5); 
        }
        for(let i = 0; i < this.currentHand.length; i++) {            
            ctx.strokeStyle = "green";
            this.buttons[i].draw(ctx);
            if(this.buttons[i].collide()) {
                ctx.strokeStyle = "red";
                this.buttons[i].draw(ctx);
            }
        }
        this.drawButton.draw(ctx);
        if(this.drawButton.collide()) {
            ctx.strokeStyle = "red";
            this.drawButton.draw(ctx);
        }
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.fillText("Draw", 360, 360);
        if(this.win) {
            ctx.font = "96px Arial";
            ctx.fillText("GAME WON!", 150, 300);
            this.drawButton.disable();
        }
        
    
    }


}