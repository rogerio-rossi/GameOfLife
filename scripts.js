
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// array de posições
var OcuppyEnviroment = new Array();
var legnthRect = 5;
var widthSlot = canvas.width/legnthRect;
var heightSlot = canvas.height/legnthRect;

// var occupyEnvironment = new Array();
var neighborhood = new Array();

var Alive = function(x, y){
	this.x = x;
	this.y = y;
	this.color = 'black';
	this.born();
}

Alive.prototype.born = function(){
	this.getPosition = this.x + ',' + this.y;
	this.addNeighbor();
	this.draw();
	// occupyEnvironment.push(this.getPosition);
}

Alive.prototype.draw = function(){
	c.beginPath();
	c.fillStyle = this.color;
	c.rect(this.x, this.y, legnthRect, legnthRect);
	c.fill();
}

Alive.prototype.addNeighbor = function(){
	for(var i = -1; i <= 1; i++){
		for(var j = -1; j <= 1; j++){
			if( j != 0 || i != 0){
				var neighborPosX = (legnthRect*i)+this.x;
				var neighborPosY = (legnthRect*j)+this.y;
				var neighborPos = neighborPosX+','+neighborPosY;
				neighborhood.push(neighborPos);
			}
		}
	}
}

// Alive.prototype.die = function(){
// 	var arrPos = occupyEnvironment.indexOf(this.getPosition);
// 	occupyEnvironment.splice(arrPos,1);
// }

var borned = 0;

var SystemEnvironment = function(){
	this.countingNeighbor = {};
	this.toBorn = new Array();
}

SystemEnvironment.prototype.filterNeighborhood = function(){
	var counting = {};
	neighborhood.forEach(function(el){
		counting[el] = counting[el] + 1 || 1;
	});
	this.countingNeighbor = counting;
}

SystemEnvironment.prototype.decideWhoBorn = function(){
	for(var pos in this.countingNeighbor){
		var numberOfNeighbor = this.countingNeighbor[pos];
		if( numberOfNeighbor == 2)
			this.toBorn.push(pos);
	}
}

SystemEnvironment.prototype.letBorn = function(){
	neighborhood = new Array();
	for( borning in this.toBorn){
		var location = this.getPos(this.toBorn[borning]);
		var _alive = new Alive(Number(location[0]), Number(location[1]));
		borned++;

	}
	console.log(borned);
}

SystemEnvironment.prototype.getPos = function(s){
	 return s.split(',');
}

SystemEnvironment.prototype.draw = function(){
	this.filterNeighborhood();
	this.decideWhoBorn();
	this.letBorn();
}

var nn = new Alive(520, 320);
var nv = new Alive(515, 325);
var ns = new Alive(525, 325);
var nn = new Alive(520, 330);
var nv = new Alive(515, 335);
var ns = new Alive(525, 335);

var s = new SystemEnvironment();


// fix requestAnimFrame para browsers que não o suportam
window.requestAnimFrame = (function(callback){
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback){
					window.setTimeout(callback, 1000 / 60);
			};
		})();



var stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '0px';
		stats.domElement.style.top = '0px';

		document.body.appendChild( stats.domElement );

		  (function animate(){
		  		stats.begin();
		    	requestAnimFrame(animate);
		    	c.clearRect(0, 0, canvas.width, canvas.height);
		    	//clearContext();

			//draw stuff
				 s.draw();
		    	stats.end();
		 })();