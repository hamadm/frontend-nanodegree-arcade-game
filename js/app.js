// Enemies our player must avoid
var Enemy = function(row,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.row= row;
    this.x = -100;
    this.y = 65 + (80*this.row);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed*dt);
    this.collosion();
    if(this.x > 505)
        this.reset();
};
Enemy.prototype.collosion = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if((this.x +80 > player.x && this.x < player.x +80) && (this.y < player.y && this.y + 60 >player.y))
        {
            player.reset();
        }
    
};
// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// rest the postion of the enemy
Enemy.prototype.reset = function() {
    this.row = Math.floor((Math.random() * 3));
    this.speed = Math.floor((Math.random()*100)+40);
    this.x = -100;
    this.y = 65 + (80*this.row);
};
// Now write your own player class
var Player = function()
{
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.row = 0;
    this.column = 2;
    this.x = (101*this.column);;
    this.y = 404 - (83*this.row);
    document.getElementById("score").innerHTML = this.score; 
}
// This class requires an update(), render() and
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (101*this.column);
    this.y = 404 - (83*this.row);
    // if the game is won
    if(this.row == 5)
    {
        this.reset();
        document.getElementById("score").innerHTML = ++this.score; 
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// to rest the player to the original place when won or lost
Player.prototype.reset = function() {
    this.row = 0;
    this.column = 2;
};

// a handleInput() method.
Player.prototype.handleInput = function(key)
{
    switch(key){
        case "left": 
            (this.column == 0) ? (this.column) : (this.column--);
            break;
        case "right":
            (this.column == 4) ? (this.column) : (this.column++);
            break;
        case "up": 
            (this.row == 5) ? (this.row) : (this.row++);
            break;
        case "down":
            (this.row == 0) ? (this.row) : (this.row--);
            break;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// generate enemies
function createEnemies()
{
    for(var i=0 ; i<5 ; i++){
        var enemy = new Enemy(Math.floor((Math.random() * 3)), Math.floor((Math.random()*100)+40));
        allEnemies.push(enemy);
    }
}
createEnemies();
