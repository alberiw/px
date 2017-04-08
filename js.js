var canvas;
var ctx;
var interval;

var maxFps = 60;
var lastFrame = 0;
var delta = 0;
var timestep = 1000 / maxFps;

var player = new GameObject(100, 21, 10, 10, "#00FF00", [], 0.1);
var opponent1 = new OpponentObject(100, 10, 10, 10, "#FF0000", [40], 0.1);
var opponent2 = new OpponentObject(10, 100, 10, 10, "#FF0000", [39], 0.1);

var gameObjects = [];
gameObjects.push(player);
gameObjects.push(opponent1);
gameObjects.push(opponent2);

function collider(o1, o2) {
	if (o1 === o2) {
		return null;
	} else if (o1.x + o1.width > o2.x &&
		o1.x < o2.x + o2.width &&
		o1.y + o1.height > o2.y &&
		o1.y < o2.y + o2.height) {
		return o2;
	} else {
		return null;
	}
};

function GameObject(x, y, width, height, color, direction, speed) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.direction = direction || [];
	this.speed = speed || 0;
	this.collider = function(o) {
		return collider(this, o);
	};
	this.move = function(delta) {
    return move(delta, this);
	};
	this.update = function() {
	};
};

function OpponentObject(x, y, width, height, color, direction, speed) {
	GameObject.apply(this, arguments);
	this.newDirection = this.direction;
	this.collider = function(o) {
		var result = collider(this, o);
		if (result !== null) {
			var index = this.direction.indexOf(39);
			if (index > -1) {
				this.newDirection = [37];
			} else {
				index = this.direction.indexOf(37);
				if (index > -1) {
					this.newDirection = [39];
				} else {
					index = this.direction.indexOf(38);
					if (index > -1) {
						this.newDirection = [40];
					} else {
						index = this.direction.indexOf(40);
						if (index > -1) {
							this.newDirection = [38];
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

function chackCollision(o1) {
	for (var i = 0; i < gameObjects.length; i++) {
		var gameObject = gameObjects[i];
		var o2 = o1.collider(gameObject);
		if (o2 !== null) {
			return o2;
		}
	}
	return null;
};

function moveTo(o1, o2, direction) {
	if (direction === 37) {//37 left
		o1.x = o2.x + o2.width;
	} else if (direction === 38) {//38 top
		o1.y = o2.y + o2.height;
	} else if (direction === 39) {//39 right
		o1.x = o2.x - o1.width;
	} else if (direction === 40) {//40 down
		o1.y = o2.y - o1.height;
	}
};

function direction(o1, value) {
	return o1.direction.indexOf(value) > -1;
};

function move(delta, o1) {
	if (direction(o1, 37)) {//37 left
		o1.x -= o1.speed * delta;
		var o2 = chackCollision(o1);
		if (o2 !== null) {
			o1.x += o1.speed * delta;
			moveTo(o1, o2, 37);
		}
	}
	if (direction(o1, 38)) {//38 top
		o1.y -= o1.speed * delta;
		var o2 = chackCollision(o1);
		if (o2 !== null) {
			o1.y += o1.speed * delta;
			moveTo(o1, o2, 38);
		}
	}
	if (direction(o1, 39)) {//39 right
		o1.x += o1.speed * delta;
		var o2 = chackCollision(o1);
		if (o2 !== null) {
			moveTo(o1, o2, 39);
		}
	}
	if (direction(o1, 40)) {//40 down
		o1.y += o1.speed * delta;
		var o2 = chackCollision(o1);
		if (o2 !== null) {
			moveTo(o1, o2, 40);
		}
	}
	//console.log(o1.x+" "+o1.y);
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
		ctx.fillStyle = gameObject.color;
		ctx.fillRect(gameObject.x, gameObject.y, gameObject.width, gameObject.height);
	}
};

function mainLoop(timestamp) {
    var numUpdateSteps = 0;
    delta += timestamp - lastFrame;
    console.log(delta);
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
	var index = player.direction.indexOf(key);
	if (index == -1) {
		player.direction.push(key);
	}
};

window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;
	var index = player.direction.indexOf(key);
	if (index > -1) {
		player.direction.splice(index, 1);
	}
};

window.onload = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	var wall1 = new GameObject(0, 0, 10, canvas.height, "#000000");
	gameObjects.push(wall1);
	var wall2 = new GameObject(canvas.width - 10, 0, 10, canvas.height, "#000000");
	gameObjects.push(wall2);
	var wall3 = new GameObject(0, 0, canvas.width, 10, "#000000");
	gameObjects.push(wall3);
	var wall4 = new GameObject(0, canvas.height - 10, canvas.width, 10, "#000000");
	gameObjects.push(wall4);
	
	run();
};