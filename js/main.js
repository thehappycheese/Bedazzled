"use strict";

///* ../lib/Canvas.js
///* ../lib/Sprite.js
///* grid.js

// =============================== INIT ===================================
document.title = "Bejewled";

var SIZE = 32;
var rGems = new Sprite("img/gems.png", 3, 3);

var grid = new Grid(16, 9);











//=============================== DECLARATIONS=============================


var canvas = new Canvas("mainCanvas");
canvas.setSize(SIZE*grid.w, SIZE*grid.h);


canvas.on("mousedown", function(e){

});



canvas.on("update",function(delta){
	var mx = Math.round(canvas.mouseX/SIZE);
	var my = Math.round(canvas.mouseY/SIZE);
	
	
	
	
});


canvas.on("draw", function (ctx) {
	canvas.clear();
	grid.draw();
});


canvas.on("blur",function(){
	canvas.ctx.fillStyle = "black";
	canvas.ctx.fillRect(0,0, canvas.width, 20);
	canvas.ctx.fillStyle = "yellow";
	canvas.ctx.font = "13 px sans-serif"
	canvas.ctx.fillText("Click here to give the game focus!",0,14);
})