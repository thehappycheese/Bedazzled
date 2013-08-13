///* Cell.js

function Grid(aw, ah){
	
	
	
	this.generate = (function(){
		//
		var i, j;
		var temp;
		this.cells = [];
		for(j = 0; j< this.h; j++){
			temp = [];
			for(i = 0; i< this.w; i++){
				temp.push(new Cell());
			}
			this.cells.push(temp);
		}

	}).bind(this);
	
	
	this.getCell = (function(ax, ay){
		//
	}).bind(this);
	
	
	this.draw = (function(){
		var i, j, cell;
		for(j = 0; j< this.h; j++){
			for(i = 0; i< this.w; i++){
				cell = this.cells[j][i];
				rGems.drawFrameAt(canvas.ctx,cell.color,i*SIZE,j*SIZE,0);
			}
		}
	}).bind(this);
	
	// =========== CONSTRUCTOR =============
	
	this.w = aw;
	this.h = ah;
	
	this.cells = [];
	this.generate();
	
}