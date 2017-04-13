const Direction = {
	TOP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,
};

var canvas;
var ctx;
var interval;

var maxFps = 60;
var lastFrame = 0;
var delta = 0;
var timestep = 1000 / maxFps;

var player = new PlayerObject("img/character.png", 10, 10, 96, 128, [], 0.1);
var opponent1 = new OpponentObject("img/character.png", 100, 10, 96, 128, [Direction.DOWN], 0.1);
var opponent2 = new OpponentObject("img/character.png", 10, 100, 96, 128, [Direction.RIGHT], 0.1);

var gameObjects = [];
gameObjects.push(player);
gameObjects.push(opponent1);
gameObjects.push(opponent2);

var fire = false;
var fireDelay = 0;

var delay = 30;

function collider(o1, o2) {
	if (o1 === o2) {
		return null;
	} else if (o1.x + o1.getWidth() > o2.x &&
		o1.x < o2.x + o2.getWidth() &&
		o1.y + o1.getHeight() > o2.y &&
		o1.y < o2.y + o2.getHeight()) {
		return o2;
	} else {
		return null;
	}
};

function Sprite(src, x, y, width, height, direction) {
	this.src = src;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.direction = direction || [];
	this.frameIndexX = 0;
	this.numberOfFramesX = 1;
	this.frameIndexY = 0;
	this.numberOfFramesY = 1;
	
	this.delay = 30;
	this.animation = [0];
	this.animationFrame = 0;
	
	this.getWidth = function () {
		return this.width / this.numberOfFramesX;
	};
	this.getHeight = function () {
		return this.height / this.numberOfFramesY;
	};
	this.spriteUpdate = function () {};
	this.render = function (context) {
		var img = new Image();
		img.src = src;
		img.onload = function () {
			img.width = this.width
			img.height = this.height
		};
		context.drawImage(
				img,
				this.animation[this.animationFrame] * this.width / this.numberOfFramesX,
				this.frameIndexY * this.height / this.numberOfFramesY,
				this.getWidth(),
				this.getHeight(),
				this.x,
				this.y,
				this.getWidth(),
				this.getHeight());
	};
};

function GameObject(src, x, y, width, height, direction, speed) {
	Sprite.apply(this, arguments);
	this.speed = speed || 0;
	this.collision = true;
	this.collider = function(o) {
		return collider(this, o);
	};
	this.move = function(delta) {
		return move(delta, this);
	};
	this.update = function() {
	};
};

function animation(o1, direction) {
	if (o1.frameIndexY == direction) {
		if (--o1.delay == 0) {
			o1.delay = delay;
			if (o1.animationFrame < o1.animation.length - 1) {
			//if (o1.frameIndexX < o1.numberOfFramesX - 1) {
				//++o1.frameIndexX;
				++o1.animationFrame
			} else {
				//o1.frameIndexX = 0;
				o1.animationFrame = 0;
			}
		}
		o1.frameIndexY = direction;
	} else {
		o1.delay = delay;
		o1.frameIndexX = 0;
		o1.frameIndexY = direction;
	}
}

function PlayerObject(src, x, y, width, height, direction, speed) {
	GameObject.apply(this, arguments);
	this.frameIndexX = 0,
	this.numberOfFramesX = 3;
	this.frameIndexY = 0,
	this.numberOfFramesY = 4;
	this.animation = [1,0,1,2];
	this.spriteUpdate = function () {
		if (directionf(this, Direction.LEFT)) {
			animation(this, 1);
		} else if (directionf(this, Direction.TOP)) {
			animation(this, 3);
		} else if (directionf(this, Direction.RIGHT)) {
			animation(this, 2);
		} else if (directionf(this, Direction.DOWN)) {
			animation(this, 0);
		}
	};
	
	this.lastDirection = direction;
	this.move = function(delta) {
		if (this.direction.length > 0) {
			this.lastDirection = this.direction.slice();
		}
		return move(delta, this);
	};
	this.update = function() {
		if (fire) {
			if (fireDelay > 0) {
				fireDelay--
				return;
			}
			var x = 0;
			var y = 0;
			var d = [];
			var a = 0;
			if (this.direction.length > 0) {
				a = this.direction[0];
			} else if (this.lastDirection.length > 0) {
				a = this.lastDirection[0];
			} else {
				a = Direction.DOWN;
			}
			if (a == Direction.TOP) {
				x = this.x + (this.getWidth() / 2);
				y = this.y - 1;
				d = [Direction.TOP];
			}
			if (a == Direction.DOWN) {
				x = this.x + (this.getWidth() / 2);
				y = this.y + this.getHeight();
				d = [Direction.DOWN];
			}
			if (a == Direction.RIGHT) {
				x = this.x + this.getWidth();
				y = this.y + (this.getHeight() / 2);
				d = [Direction.RIGHT];
			}
			if (a == Direction.LEFT) {
				x = this.x - 1;
				y = this.y + (this.getHeight() / 2);
				d = [Direction.LEFT];
			}
			var shot = new ShotObject("img/shot.png", x, y, 3, 3, d, 0.2);
			gameObjects.push(shot);
			fireDelay = 10;
		}
	};
}

function OpponentObject(src, x, y, width, height, direction, speed) {
	GameObject.apply(this, arguments);
	this.frameIndexX = 1,
	this.numberOfFramesX = 3;
	this.frameIndexY = 0,
	this.numberOfFramesY = 4;
	this.animation = [1,0,1,2];
	this.spriteUpdate = function () {
		if (directionf(this, Direction.LEFT)) {
			animation(this, 1);
		} else if (directionf(this, Direction.TOP)) {
			animation(this, 3);
		} else if (directionf(this, Direction.RIGHT)) {
			animation(this, 2);
		} else if (directionf(this, Direction.DOWN)) {
			animation(this, 0);
		}
	};
	
	this.newDirection = this.direction;
	this.collider = function(o) {
		var result = collider(this, o);
		if (result !== null) {
			var index = this.direction.indexOf(Direction.RIGHT);
			if (index > -1) {
				this.newDirection = [Direction.LEFT];
			} else {
				index = this.direction.indexOf(Direction.LEFT);
				if (index > -1) {
					this.newDirection = [Direction.RIGHT];
				} else {
					index = this.direction.indexOf(Direction.TOP);
					if (index > -1) {
						this.newDirection = [Direction.DOWN];
					} else {
						index = this.direction.indexOf(Direction.DOWN);
						if (index > -1) {
							this.newDirection = [Direction.TOP];
						}
					}
				}
			} 
		}
		return result;
	};
	this.update = function() {
		this.direction = this.newDirection;
	};
};

function ShotObject(src, x, y, width, height, direction, speed) {
	GameObject.apply(this, arguments);
	this.collision = false;
	this.collider = function(o) {
		var result = collider(this, o);
		if (result !== null) {
			var index = gameObjects.indexOf(this);
			if (index > -1) {
				gameObjects.splice(index, 1);
			}
		}
		return result;
	};
};

function chackCollision(o1) {
	for (var i = 0; i < gameObjects.length; i++) {
		var gameObject = gameObjects[i];
		if (gameObject.collision) {
			var o2 = o1.collider(gameObject);
			if (o2 !== null) {
				return o2;
			}
		}
	}
	return null;
};

function moveTo(o1, o2, direction) {
	if (direction === Direction.LEFT) {//37 left
		o1.x = o2.x + o2.getWidth();
	} else if (direction === Direction.TOP) {//38 top
		o1.y = o2.y + o2.getHeight();
	} else if (direction === Direction.RIGHT) {//39 right
		o1.x = o2.x - o1.getWidth();
	} else if (direction === Direction.DOWN) {//40 down
		o1.y = o2.y - o1.getHeight();
	}
};

function directionf(o1, value) {
	return o1.direction.indexOf(value) > -1;
};

function move(delta, o1) {
	if (directionf(o1, Direction.LEFT)) {//37 left
		o1.x -= o1.speed * delta;
		var o2 = chackCollision(o1);
		if (o2 !== null) {
			o1.x += o1.speed * delta;
			moveTo(o1, o2, Direction.LEFT);
		}
	}
	if (directionf(o1, Direction.TOP)) {//38 top
		o1.y -= o1.speed * delta;
		var o2 = chackCollision(o1);
		if (o2 !== null) {
			o1.y += o1.speed * delta;
			moveTo(o1, o2, Direction.TOP);
		}
	}
	if (directionf(o1, Direction.RIGHT)) {//39 right
		o1.x += o1.speed * delta;
		var o2 = chackCollision(o1);
		if (o2 !== null) {
			moveTo(o1, o2, Direction.RIGHT);
		}
	}
	if (directionf(o1, Direction.DOWN)) {//40 down
		o1.y += o1.speed * delta;
		var o2 = chackCollision(o1);
		if (o2 !== null) {
			moveTo(o1, o2, Direction.DOWN);
		}
	}
};

function update(delta) {
	for (var i = 0; i < gameObjects.length; i++) {
		var gameObject = gameObjects[i];
		gameObject.move(delta);
		gameObject.update();
	}
};

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	for (var i = 0; i < gameObjects.length; i++) {
		var gameObject = gameObjects[i];
		gameObject.spriteUpdate();
		gameObject.render(ctx);
	}
};

function mainLoop(timestamp) {
    var numUpdateSteps = 0;
    delta += timestamp - lastFrame;
    lastFrame = timestamp;
    while (delta >= timestep) {
    	update(timestep);
    	delta -= timestep;
    	if (++numUpdateSteps >= 240) {
    		delta = 0;
    		break;
    	}
    }
    draw();
    interval = requestAnimationFrame(mainLoop);
};

function run() {
	interval = requestAnimationFrame(mainLoop);
};

function stop() {
	cancelAnimationFrame(interval);
};

window.onkeydown = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;
	if (key == 17) {//17 ctrl
		fire = true;
	}
	if (key >= 37 && key <= 40) {
		var index = player.direction.indexOf(key);
		if (index == -1) {
			player.direction.push(key);
		}
	}
};

window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;
	if (key == 17) {//17 ctrl
		fire = false;
	}
	if (key >= 37 && key <= 40) {
		var index = player.direction.indexOf(key);
		if (index > -1) {
			player.direction.splice(index, 1);
		}
	}
};

window.onload = function() {
	canvas = document.getElementById("canvas");
	canvas.height = 500;
	canvas.width = 500;
	ctx = canvas.getContext("2d");
	
	var wall1 = new GameObject("", 0, 0, 10, canvas.height);
	gameObjects.push(wall1);
	var wall2 = new GameObject("", canvas.width - 10, 0, 10, canvas.height);
	gameObjects.push(wall2);
	var wall3 = new GameObject("", 0, 0, canvas.width, 10);
	gameObjects.push(wall3);
	var wall4 = new GameObject("", 0, canvas.height - 10, canvas.width, 10);
	gameObjects.push(wall4);
	
	run();
};