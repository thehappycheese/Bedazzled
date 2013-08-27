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
	canvas.canvas.focus();
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
			grid.swap(selection.x,selection.y,selection.x,selection.y-1);
			cursor.v = !cursor.v;
			if(grid.getCell(selection.x,selection.y).color === grid.getCell(selection.x-1,selection.y).color){
				if(grid.getCell(selection.x,selection.y).color === grid.getCell(selection.x-2,selection.y).color){
					grid.getCell(selection.x,selection.y).color = 8;
				}
			}
		}
		if(canvas.isKeyDown(KEYS.down) || canvas.isKeyDown(KEYS.s)){
			grid.swap(selection.x,selection.y,selection.x,selection.y+1);
			cursor.v = !cursor.v;
		}
		if(canvas.isKeyDown(KEYS.a) || canvas.isKeyDown(KEYS.left)){
			grid.swap(selection.x,selection.y,selection.x-1,selection.y);
			cursor.v = !cursor.v;
		}
		if(canvas.isKeyDown(KEYS.right) || canvas.isKeyDown(KEYS.d)){
			grid.swap(selection.x,selection.y,selection.x+1,selection.y);
			cursor.v = !cursor.v;
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

function gridChecker(){
	var i, j;
	for(j = 0; j< grid.h; j++){
		for(i = 0; i< grid.w; i++){
			if(grid.isInside(i-1,j-1)){			
				if(grid.isInside(i-2,j-2)){		
					if(grid.isInside(i+1,j+1)){			
						if(grid.isInside(i+2,j+2)){		
							if(grid.getCell(i,j).color === grid.getCell(i-1,j).color){
								if(grid.getCell(i,j).color === grid.getCell(i-2,j).color){
									grid.getCell(i,j).color = 8;
								}
							}
							if(grid.getCell(i,j).color === grid.getCell(i+1,j).color){
								if(grid.getCell(i,j).color === grid.getCell(i+2,j).color){
									grid.getCell(i,j).color = 8;
								}
							}
							if(grid.getCell(i,j).color === grid.getCell(i,j-1).color){
								if(grid.getCell(i,j).color === grid.getCell(i,j-2).color){
									grid.getCell(i,j).color = 8;
								}
							}
							if(grid.getCell(i,j).color === grid.getCell(i,j+1).color){
								if(grid.getCell(i,j).color === grid.getCell(i,j+2).color){
									grid.getCell(i,j).color = 8;
								}
							}
						}
					}
				}
			}
		}
	}
}	
function gridChecker2(){
	var i, j;
	for(j = 0; j< grid.h; j++){
		for(i = 0; i< grid.w; i++){			
			if(grid.isInside(i+1,j)){		
				if(grid.getCell(i,j).color === grid.getCell(i+1,j).color){
					grid.getCell(i,j).check = true;
					grid.getCell(i+1,j).parent.push(getCell(i,j));
					grid.getCell(i,j).child.push(getCell(i+1,j));
					
				}
			}
			if(grid.isInside(i,j+1)){
				if(grid.getCell(i,j).color === grid.getCell(i,j+1).color){
					grid.getCell(i,j).check = true;
					grid.getCell(i,j+1).parent.push(getCell(i,j));
					grid.getCell(i,j).child.push(getCell(i,j+1));
				}
			}
		}
	}
}
function checkShape(){
	var i,j;
	for(j = 0; j< grid.h; j++){
		for(i = 0; i< grid.w; i++){	
			if(grid.getCell(i,j).check){
					grid.getCell(i,j).color = 8;
			}
		}
	}
}