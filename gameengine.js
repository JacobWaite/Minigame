// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null;
        this.mousepressed = null;
        this.mouse = {x:0, y:0};
        this.wheel = null;
        this.manager = null;
        this.keys = {};

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            console.log("click");
            if(this.entities.length > 0) {
                let player = this.manager.player;
                for(let i = 0; i < player.currentHand.length; i++) {     
                   
                    if(player.buttons[i].collide()) {
                        let currentCard = player.currentHand[i];
                        let currentPlayingCard = this.manager.getCurrentPlayingCard();
                        if(currentCard.color == currentPlayingCard.color || currentCard.value == currentPlayingCard.value) {
                            this.manager.discard(currentCard);
                            player.currentHand.splice(i,1);
                            player.buttons.pop();
                            player.turnComplete = true;
                            player.turn = false;
                        }
                    }
                }
        
                if(player.drawButton.collide() && this.manager.deck.length > 0) {
                    let currentCard = this.manager.drawCard();
                    player.currentHand.push(currentCard);
                    player.buttons.push(new button(player, 100+(((player.buttons.length)*75)+15), 600, currentCard.width, currentCard.height, 1.5));
                    player.cardsDrawn ++;
                    if(!player.draw2) {
                        player.turnComplete = true;
                        player.turn = false;
                    } else if(player.draw2 && player.cardsDrawn == 2) {
                        player.turnComplete = true;
                        player.turn = false;
                        player.draw2 = false;
                        player.cardsDrawn = 0;
                    }
                    
                }
                
            }
            
            
        });

        this.ctx.canvas.addEventListener("mouseup", e => {
            if (this.options.debugging) {
                console.log("UP", getXandY(e));
            }
            console.log("UP");
            this.click = true;
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });
        this.ctx.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        this.ctx.canvas.addEventListener("keyup", event => this.keys[event.key] = false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx);
        }
        this.manager.draw(this.ctx);
        
    };

    update() {
        let entitiesCount = this.entities.length;
        this.manager.update();
        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};

// KV Le was here :)