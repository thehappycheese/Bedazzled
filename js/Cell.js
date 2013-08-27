

var cellcols = {
	RED 	 : 0,
	GREEN	 : 1,
	BLUE	 : 2,
	YELLOW	 : 3,
	MAGENTA	 : 4,
	CYAN	 : 5,
	WHITE	 : 6,
	ORANGE	 : 7,
	MULTI	 : 8
}




function Cell(){
	this.random = (function(){
		switch(Math.floor(Math.random()*7)){
			case 0:
				return cellcols.RED;
			case 1:
				return cellcols.GREEN;
			case 2:
				return cellcols.BLUE;
			case 3:
				return cellcols.YELLOW;
			case 4:
				return cellcols.MAGENTA;
			case 5:
				return cellcols.WHITE;
			case 6:
				return cellcols.ORANGE;
		}
	}).bind(this);
	
	// ======== CONSTRUCTOR ==========
	this.color = this.random();
	this.check = false;
	this.parent = [];
	this.child = [];
}
