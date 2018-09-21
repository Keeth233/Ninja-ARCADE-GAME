let score = 0;
document.getElementById('score').innerHTML = score;

// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 55;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //delta Time movement of bugs/enemy in x axis
    if (this.x < this.boundary) {
        this.x += this.speed * dt;
    } else {
        this.x = this.resetPos; //reset position to start after boundary limit
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
            this.x = 0;
            this.y = 0;
            this.sprite = 'images/char-boy.png';
            this.step = 101; //x axis move in pixels
            this.jump = 83; //y axis move in pixels
            this.startX = this.step * 2;
            this.startY = (this.jump * 4) + 55;
            this.x = this.startX; //startPosition in X axis
            this.y = this.startY; //startPosition in Y axis
            this.victory = false;
        }
        //Draw Player Position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(input) {

        //Player Movement on keyboard action
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'up':
                if (this.y > this.jump - 80) {
                    this.y -= this.jump;
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;
        }

    }

    // check collison of Player and enemy on same axis
    update() {
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + enemy.step > this.x && enemy.x < this.x + this.step / 2)) {
                this.reset();
            }

        }

        //Player makes it Safely, inrease score by 1 and reset position; WIN
        if (this.y === 55) {
            score++;
            document.getElementById('score').innerHTML = score;
            this.reset();
        }

    }

    //reset coordinates of Player
    reset() {
        this.x = this.startX; //startPosition in X axis
        this.y = this.startY; //startPosition in Y axis
    }


}

const player = new Player();

const enemy1 = new Enemy(-101, 0, 200);
const enemy2 = new Enemy(-101, 83, 250);
const enemy3 = new Enemy((-101 * 2.5), 83, 300);
const enemy4 = new Enemy(-101, 166, 420);

const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4);
console.log(allEnemies);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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