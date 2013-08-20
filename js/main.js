"use strict";
// Trial and error settings activated
///* ../lib/Canvas.js
///* ../lib/Sprite.js
///* grid.js

// =============================== INIT ===================================
document.title = "Bejewled";

var SIZE = 32;
var rGems = new Sprite("img/gems.png", 3, 3);
var rCursor = new Sprite("img/cursor.png", 1, 1);
var rSelect = new Sprite("img/Selector.png", 1, 1);
var grid = new Grid(16, 9);
var cursor = {x:0,y:0,v:false};
var selection = {x:0,y:0};











//=============================== DECLARATIONS=============================


var canvas = new Canvas("mainCanvas");
canvas.setSize(SIZE*grid.w, SIZE*grid.h);


canvas.on("mousedown", function(e){
	e.preventDefault();
	if (cursor.v===false){
		cursor.v = !cursor.v;
		selection.x = -1;
		selection.y = -1;
	}
	if (cursor.v===true &&selection.x==cursor.x&&selection.y==cursor.y){
		cursor.v = !cursor.v;
	}else{
		selection.x = cursor.x;
		selection.y = cursor.y;
	}
});

canvas.on("keydown", function(e){
	if (cursor.v === true){
		if(canvas.isKeyDown(KEYS.up) || canvas.isKeyDown(KEYS.w)){
			if (selection.y==0){
				return
			}else{
				var temp = grid.cells[selection.y][selection.x];
				grid.cells[selection.y][selection.x] = grid.cells[selection.y-1][selection.x];
				grid.cells[selection.y-1][selection.x] = temp;
				cursor.v = !cursor.v;
			}
		}
		if(canvas.isKeyDown(KEYS.down) || canvas.isKeyDown(KEYS.s)){
			if (selection.y==grid.h-1){
				return
			}else{
				var temp = grid.cells[selection.y][selection.x];
				grid.cells[selection.y][selection.x] = grid.cells[selection.y+1][selection.x];
				grid.cells[selection.y+1][selection.x] = temp;
				cursor.v = !cursor.v;
			}
		}
		if(canvas.isKeyDown(KEYS.a) || canvas.isKeyDown(KEYS.left)){
			if (selection.x==0){
				return
			}else{
				var temp = grid.cells[selection.y][selection.x];
				grid.cells[selection.y][selection.x] = grid.cells[selection.y][selection.x-1];
				grid.cells[selection.y][selection.x-1] = temp;
				cursor.v = !cursor.v;
			}
		}
		if(canvas.isKeyDown(KEYS.right) || canvas.isKeyDown(KEYS.d)){
			if (selection.x==grid.w-1){
				return
			}else{
				var temp = grid.cells[selection.y][selection.x];
				grid.cells[selection.y][selection.x] = grid.cells[selection.y][selection.x+1];
				grid.cells[selection.y][selection.x+1] = temp;
				cursor.v = !cursor.v;
			}
		}
		
	}
});


canvas.on("update",function(delta){
	cursor.x = Math.floor(canvas.mouseX/SIZE);
	cursor.y = Math.floor(canvas.mouseY/SIZE);
	
	
	
	
});


canvas.on("draw", function (ctx) {
	canvas.clear();
	grid.draw();
	rCursor.drawFrameAt(canvas.ctx,0,cursor.x*SIZE,cursor.y*SIZE);
	if (cursor.v === true){
		rSelect.drawFrameAt(canvas.ctx,0,selection.x*SIZE,selection.y*SIZE);
	}
});


canvas.on("blur",function(){
	canvas.ctx.fillStyle = "black";
	canvas.ctx.fillRect(0,0, canvas.width, 20);
	canvas.ctx.fillStyle = "yellow";
	canvas.ctx.font = "13 px sans-serif"
	canvas.ctx.fillText("Click here to give the game focus!",0,14);
})