class gamemanager {
    constructor(game) {
        this.game = game;
        this.game.manager = this;
        this.currentTurn = 0;
        this.player = new playablePlayer(this.game, 250,250);
        this.currentPlayer = null;
        this.numberOfPlayers = 4;
        this.deck = [];
        this.discard = [];
        this.players = [];
        for(let i = 0; i < this.numberOfPlayers-1; i++) {
            let newplayer = new player(this.game, i, i);
            this.players.push(newplayer);
        }
        
        this.players.push(this.player);

        for(let i = 0; i < 4; i++) {

            for(let j = 0; j < 12; j++) {
                if(i == 0) {
                this.deck.push(new card(this.game,"blue", j, ASSET_MANAGER.getAsset("./unoCards.png"), 9 + 43*j, 9, 34, 53));

                } else if(i == 1) {
                this.deck.push(new card(this.game,"green", j, ASSET_MANAGER.getAsset("./unoCards.png"), 9 + 43*j, 71.5, 34, 54));

                } else if(i == 2) {
                this.deck.push(new card(this.game,"red", j,ASSET_MANAGER.getAsset("./unoCards.png"), 9 + 43*j, 134, 34, 54 ));

                } else if(i == 3) {
                this.deck.push(new card(this.game,"yellow", j,ASSET_MANAGER.getAsset("./unoCards.png"), 9 + 43*j, 197, 34, 54 ));

                }
            }
        }
        for(let i = 0; i < this.numberOfPlayers; i++) {
            for(let j = 0; j < 7; j++) {
                let currentCard = this.deck.pop();
                this.players[i].currentHand.push(currentCard);
                if(this.players[i] instanceof playablePlayer) {
                    console.log(currentCard);
                    this.players[i].buttons.push(new button(this.players[i], 100+((j*75)+15), 600, currentCard.width, currentCard.height, 1.5));
                    console.log(this.players[i].buttons[j]);
                }
            }
            console.log(`Player hand dealt: ${this.players[i]} hand length: ${this.players[i].currentHand.length}`);
        }

        for(let i = 0; i < this.numberOfPlayers; i++) {
            this.game.addEntity(this.players[i]);
            console.log("player added");
        }
        this.discard.push(this.deck.pop());
    }

    createPlayers() {

    }

    update() {

    }

    draw(ctx) {
         ctx.fillStyle = "black";
         ctx.font = "14px Arial";
         ctx.fillText(`entities: ${this.game.entities.length}`, 10, 600);
         ctx.drawImage(this.discard[this.discard.length - 1].cardImage, this.discard[this.discard.length - 1].x, this.discard[this.discard.length - 1].y, this.discard[this.discard.length - 1].width, 
            this.discard[this.discard.length - 1].height, 200, 200, this.discard[this.discard.length - 1].width*1.5, this.discard[this.discard.length - 1].height*1.5); 
    }


}