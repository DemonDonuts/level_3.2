function GameObject() 
{
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.radius = 25;
    this.color = "blue";
}

GameObject.prototype.drawCircle = function(context) 
{
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
}

GameObject.prototype.drawRect = function(context) 
{
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
}



// sense uh things edges 
GameObject.prototype.top = function()
{
    return this.y;
}

GameObject.prototype.bottom = function()
{
    return this.y + this.height;
}

GameObject.prototype.left = function()
{
    return this.x;
}

GameObject.prototype.right = function()
{
    return this.x + this.width;
}

//collison
GameObject.prototype.collidesWith = function(other) 
{
    return !(
        this.bottom() < other.top() || 
        this.top() > other.bottom() ||
        this.right() < other.left() ||
        this.left() > other.right()
    );
   
}