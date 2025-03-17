class player {
    constructor(game, name, x, y) {
        Object.assign(this, {game,name,x,y});
        this.currentHand = [];
        this.turn = false;
        this.turnComplete = false;
        this.cardToPlay = null;
        this.played = false;
        this.drawing = false;
        //this.ableToPlay = false;
        this.turnTime = 0;
        this.image = ASSET_MANAGER.getAsset("./player.png");

        //console.log(`${x} ${y}`);
    }

    update() {
        if(this.currentHand.length == 0) {
            this.game.manager.lost = true;
            return;
        }
        if(this.turn && this.turnTime > 7) {
            this.play();
            this.turnComplete = true;
            this.turnTime = 0;
        }
        if(this.turn) {
            this.turnTime += this.game.clockTick;
            //console.log(`Player ${this.game.manager.currentTurn} is playing: ${this}`);
        }
    }

    draw(ctx) {
        /*
        ctx.strokeStyle = "blue";
        for(let i = 0; i < this.currentHand.length; i++) {
            ctx.strokeRect(306+i*75, 740, 70, 100);
            ctx.drawImage(this.currentHand[i].cardImage, this.currentHand[i].x, this.currentHand[i].y, this.currentHand[i].width, 
                this.currentHand[i].height, 300+((i*75)+15), 750, this.currentHand[i].width*1.5, this.currentHand[i].height*1.5); 
        }
                */
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        
        if(this.x == 0) {
        
            ctx.drawImage(this.image, 50, 300);
            if(this.turn) {
                ctx.strokeRect(50,300,64,64);
                ctx.strokeStyle = "black";
                ctx.font = "16px Arial";
                if(this.drawing) {
                    ctx.fillText(`Player 2 is drawing...`, 40, 400);
                } else {
                    ctx.fillText(`Player 2 is playing...`, 40, 400);
                }

            }
        } else if(this.x == 1) {
            ctx.drawImage(this.image, 350, 10);
            if(this.turn) {
                ctx.strokeRect(350,10,64,64);
                ctx.strokeStyle = "black";
                ctx.font = "16px Arial";
                if(this.drawing) {
                    ctx.fillText(`Player 3 is drawing...`, 320, 100);
                } else {
                    ctx.fillText(`Player 3 is playing...`, 320, 100);
                }
                

            }

        } else if(this.x == 2) {
            ctx.drawImage(this.image, 650, 300);
            if(this.turn) {
                ctx.strokeRect(650,300,64,64);
                ctx.strokeStyle = "black";
                ctx.font = "16px Arial";
                if(this.drawing) {
                    ctx.fillText(`Player 4 is drawing...`, 620, 400);
                } else {
                    ctx.fillText(`Player 4 is playing...`, 620, 400);
                }
                
            }
        }
    
    }

    canPlay(card) {
        //if a card in the hand has the same color or number as the input card, return true
        //if the player possesses a wild or a draw 4, return true
        //else return false
        let i = 0;
        let notFound = this.currentHand.length > 0;
        while(notFound) {
            //console.log(`Hand Length:  ${this.currentHand.length} i: ${i} `);

            if(this.currentHand[i].color == card.color || this.currentHand[i].value == card.value) {
                this.cardToPlay = this.currentHand.splice(i,1)[0];
                //console.log("card to play: " + this.cardToPlay);
                //this.ableToPlay = true;
                return true;
            }
            i ++;
            notFound = i < this.currentHand.length;

        }
        //this.ableToPay = false;
        return false;
    }

    play() {
        if(this.canPlay(this.game.manager.getCurrentPlayingCard())) {
            this.drawing = false;
            this.game.manager.discard(this.cardToPlay);
        } else {
            this.drawing = true;
            this.currentHand.push(this.game.manager.drawCard());
        }
        this.played = true;
        
    }

    toString() {
        return `Player: ${this.currentHand}`;
    }
}