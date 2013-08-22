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
		return this.cells[ay][ax];
	}).bind(this);
	
	this.setCell = (function(ax,ay, value){
		return this.cells[ay][ax] = value;
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
	
	this.swap = (function(sx,sy,ex,ey){
		if(this.isInside(ex,ey)){
			var temp = grid.getCell(sx,sy);
			grid.setCell(sx,sy,grid.getCell(ex,ey));
			grid.setCell(ex,ey,temp);
		}
	}).bind(this);
	
	this.isInside = (function(x,y){
		return x>=0 && x<grid.w && y>=0 && y<grid.h
	}).bind(this);
	
	// =========== CONSTRUCTOR =============
	
	this.w = aw;
	this.h = ah;
	
	this.cells = [];
	this.generate();
	
}