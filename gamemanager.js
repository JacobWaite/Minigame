class gamemanager {
    constructor(game) {
        this.game = game;
        this.currentTurn = 0;
        this.player = new playablePlayer;
        this.currentPlayer = null;
        this.numberOfPlayers = 4;
        this.deck = [];
        this.discard = [];
        this.players = [];
        for(let i = 0; i < this.numberOfPlayers; i++) {
            this.players.push(new player(this.game, i, i));
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
        console.log(this.deck);
        this.player.currentHand.push(this.deck.pop());
        this.player.currentHand.push(this.deck.pop());
        this.player.currentHand.push(this.deck.pop());
        this.player.currentHand.push(this.deck.pop());
        this.player.currentHand.push(this.deck[12]);
        this.player.currentHand.push(this.deck[13]);
        this.player.currentHand.push(this.deck[5]);
        this.game.addEntity(this.player);
        this.currentCard = this.deck.pop();
        
    }

    createPlayers() {

    }

    draw(ctx) {
         
    }


}