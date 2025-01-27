class Paladin{
    constructor(game, x, y, spriteSheet, width, height, xSpriteOffset, ySpriteOffset, health, strength, speed, intelligence)  {
        Object.assign(this, {game,x,y,spriteSheet, width, height, xSpriteOffset, ySpriteOffset,health,strength,speed,intelligence});
        this.animationPlayer = new AnimationPlayer();
        this.animationPlayer.addAnimation("attack", new Animation(this.spriteSheet, 0, 0, 64, 64, 0, 3, true, [0.125,0.125,0.09,0.5], false, true));
        
       
    }


    update() {};
   

    draw(ctx) {
        this.animationPlayer.playAnimation("attack", this.game.clockTick, ctx, 50, 50, 4);
    };
    
}