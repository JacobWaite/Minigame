class gamemanager {
    constructor(game) {
        this.game = game;
        this.game.manager = this;
        this.currentTurn = 0;
        this.started = true;
        this.player = new playablePlayer(this.game, 250,250);
        this.currentPlayer = null;
        this.numberOfPlayers = 4;
        this.deck = [];
        this.discardPile = [];
        this.players = [];
        this.gameTime = 0;
        this.reversed = false;
        this.won = false;
        this.lost = false;
        this.players.push(this.player);
        for(let i = 0; i < this.numberOfPlayers-1; i++) {
            let newplayer = new player(this.game, `Marv ${i+1}`, i % 3, 0);
            this.players.push(newplayer);
        }
        
        //console.log(this.players);
        for(let i = 0; i < 4; i++) {

            for(let j = 0; j < 13; j++) {
                if(i == 0) {
                this.deck.push(new card(this.game,"green", j, ASSET_MANAGER.getAsset("./unoCards.png"), 9 + 43*j, 9, 34, 53));

                } else if(i == 1) {
                this.deck.push(new card(this.game,"yellow", j, ASSET_MANAGER.getAsset("./unoCards.png"), 9 + 43*j, 71.5, 34, 54));

                } else if(i == 2) {
                this.deck.push(new card(this.game,"red", j,ASSET_MANAGER.getAsset("./unoCards.png"), 9 + 43*j, 134, 34, 54 ));

                } else if(i == 3) {
                this.deck.push(new card(this.game,"blue", j,ASSET_MANAGER.getAsset("./unoCards.png"), 9 + 43*j, 197, 34, 54 ));

                }
            }
        }
        this.shuffle();
        for(let i = 0; i < this.numberOfPlayers; i++) {
            for(let j = 0; j < 7; j++) {
                let currentCard = this.deck.pop();
                this.players[i].currentHand.push(currentCard);
                if(this.players[i] instanceof playablePlayer) {
                    //console.log(currentCard);
                    this.players[i].buttons.push(new button(this.players[i], 100+((j*75)+15), 600, currentCard.width, currentCard.height, 1.5));
                    //console.log(this.players[i].buttons[j]);
                }
            }
            //console.log(`Player hand dealt: ${this.players[i]} hand length: ${this.players[i].currentHand.length}`);
        }

        for(let i = 0; i < this.numberOfPlayers; i++) {
            this.game.addEntity(this.players[i]);
            //console.log("player added");
        }
        this.discard(this.deck.pop());
        //console.log(this.discardPile);
    }

    createPlayers() {

    }

    discard(card) {
        this.discardPile.push(card);
    }

    getCurrentPlayingCard() {
        return this.discardPile[this.discardPile.length - 1];
    }

    drawCard() {
        let card = this.deck.splice(0,1);
        return card[0];
    }
    update() {
        if(this.won || this.lost) {
            return;
        }
        if(this.deck.length > 0) {
            this.gameTime += this.game.clockTick;
            this.players[this.currentTurn].turn = true;
            if(this.players[this.currentTurn].turnComplete) {
                this.players[this.currentTurn].turnComplete = false;
                this.players[this.currentTurn].turn = false;
                if(this.getCurrentPlayingCard().value == 10) {
                    this.skipturn();
                } else if(this.getCurrentPlayingCard().value == 11) {
                    this.reversed = !this.reversed;
                }
                if(!this.reversed) {
                    this.currentTurn++;
                } else {
                    this.currentTurn --;
                }
                if(this.currentTurn == this.numberOfPlayers && !this.reversed){
                    this.currentTurn = 0;
                } else if(this.currentTurn < 0 && this.reversed) {
                    this.currentTurn = this.numberOfPlayers - 1;
                }
                if(!(this.players[this.currentTurn] instanceof playablePlayer) && this.getCurrentPlayingCard().value == 12) {
                    this.draw2();
                } else {
                    this.players[this.currentTurn].draw2 == true;
                }
            }
        } else {
            let card = this.getCurrentPlayingCard();
            this.deck = this.discardPile;
            this.discardPile = [card];
        }
    }

    shuffle() {
        let currentIndex = this.deck.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [this.deck[currentIndex], this.deck[randomIndex]] = [
            this.deck[randomIndex], this.deck[currentIndex]];
        }
      }

      skipturn() {
        if(!this.reversed) {
            this.currentTurn++;
        } else {
            this.currentTurn --;
        }
        if(this.currentTurn == this.numberOfPlayers){
            this.currentTurn = 0;
        } else if(this.currentTurn < 0) {
            this.currentTurn = this.numberOfPlayers - 1;
        }
        //console.log(`player: ${this.currentTurn} was skipped`);

      }
      
      draw2() {        
        //console.log(`draw 2 player: ${this.currentTurn}`);
        //console.log(`player: ${this.currentTurn} deck before: ${this.players[this.currentTurn].currentHand}`);
        this.players[this.currentTurn].currentHand.push(this.drawCard());
        this.players[this.currentTurn].currentHand.push(this.drawCard());
        //console.log(`player: ${this.currentTurn} deck is now: ${this.players[this.currentTurn].currentHand}`);

        this.skipturn();
      }
      

    draw(ctx) {
         ctx.fillStyle = "black";
         ctx.font = "14px Arial";
         //ctx.fillText(`entities: ${this.game.entities.length}`, 10, 600);
         //ctx.fillText(`currentPlayer: ${this.currentTurn} ${this.players[this.currentTurn]}`, 10, 610);
         //ctx.fillText(`reversed: ${this.reversed}`, 10, 620);
         ctx.font = "32px Arial";
         let lastAction = `A ${this.getCurrentPlayingCard().color} ${this.getCurrentPlayingCard().value}`;
         if(this.getCurrentPlayingCard().value > 9) {
            if(this.getCurrentPlayingCard().value == 10) lastAction = "A skip card";
            if(this.getCurrentPlayingCard().value == 11) lastAction = "A reverse card";
            if(this.getCurrentPlayingCard().value == 12) lastAction = "A draw 2 card";
         }
         if(this.started) {
            ctx.fillText(`The starting card is a ${this.getCurrentPlayingCard().color} ${this.getCurrentPlayingCard().value}`, 170, 150);

         } else {
            ctx.fillText(`${lastAction} was played`, 220, 150);
         }

         if(this.won) {
            ctx.font = "96px Arial";
            ctx.fillText("GAME WON!", 150, 300);
        } else if(this.lost) {
            ctx.font = "96px Arial";
            ctx.fillText("YOU LOST!", 150, 300);
        }
         ctx.drawImage(this.getCurrentPlayingCard().cardImage, this.getCurrentPlayingCard().x, this.getCurrentPlayingCard().y, this.getCurrentPlayingCard().width, 
            this.getCurrentPlayingCard().height, 350, 200, this.getCurrentPlayingCard().width*1.5, this.getCurrentPlayingCard().height*1.5); 
    }


}