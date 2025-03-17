class button{
    constructor(parent, x, y, width, height, scale){
        Object.assign(this, {parent, x, y, scale})
        this.width = width * scale;
        this.height = height * scale;
        this.left = this.x;
        this.top = this.y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
        this.enabled = true;

    }

    collide() {

        if(this.enabled && this.parent.game.mouse.x < this.right &&  this.parent.game.mouse.x > this.left&& this.parent.game.mouse.y < this.bottom 
            && this.parent.game.mouse.y > this.top) {
            return true;
        } 
        return false;
    }
   
    draw(ctx) {
        ctx.strokeRect(this.left, this.top, this.width, this.height);
    } 
    
    disable() {
        this.enabled = false;
    }
    enable() {
        this.enabled = true;
    }

    toString() {
        return "LeftBound: " + this.left + "TopBound: " + this.top + "RightBound: " + this.right + "BottomBound: " + this.bottom;
    }
}