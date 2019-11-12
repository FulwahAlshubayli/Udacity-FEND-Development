// Enemies our player must avoid
var Enemy = function(enemy) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = enemy;
    this.speed = 5;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   this.x += this.speed * Math.cos(dt);
   //this.y -= this.speed * Math.sin(dt);

   //resetting the position of the enemies to the beginning once it reached the end of the road
   if (this.x > 500){
     this.x -= 620;
     // changing the speed of the enemies randomly
     this.speed = Math.random() * (7 - 5) + 5;

   }


   //Handle collision of the enemy with the Player
//console.log('if enemy touches the player', player.x, this.x)
if ((this.y > player.y - 70 && this.y < player.y + 70) && (this.x > player.x - 70 && this.x < player.x + 70)) {
  console.log("loose");
  // reset player coordinates
  player.x = 199;
  player.y=400;
}

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.player = 'images/char-boy.png';
  this.x = 199;
  this.y=400;
};


Player.prototype.update = function(dt) {
console.log('update player location')
  //reset player coordinates when it touchs the enemy
  //console.log('yyy',this.y);
  if (this.y < 0){
    console.log('won the game');
    player.reset();


  }
};
Player.prototype.reset = function() {
  setTimeout(() => {

    this.x = 199;
    this.y=400;  }, 100);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function(move) {
// to change the player location on key clicks
if (move == 'up' && this.y > 0) {
  this.y -= 88;
  //console.log('up y', this.y, 'up x', this.x);
};

if (move == 'left' && this.x > 0) {
  this.x -= 108;
  //console.log('left', this.x);
};

if (move == 'right' && this.x < 415) {
  this.x += 108;
  //console.log('right', this.x);
};

if (move == 'down' && this.y < 400) {
  this.y += 88;
  console.log('down', this.y);
};



};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [];
enemyCoordinates = [64,150,233]
enemyCoordinates.forEach(function(coordinates){
var enemy = new Enemy(coordinates);
allEnemies.push(enemy)
});
// Place the player object in a variable called player
var player = new Player();



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
