


function Sprite(url, acolumns, arows){
	"use strict";
	
	
	this.onImgLoad = (function (e) {
		this.canvas.width	= this.img.width;
		this.canvas.height	= this.img.height;
		this.ctx.drawImage(this.img, 0, 0);
		delete this.img;
		
		this.scale(2);
		
		this.dx = this.canvas.width/this.columns;
		this.dy = this.canvas.height/this.rows;
		this.frames = this.rows * this.columns;
	}).bind(this);
	
	
	this.scale = (function (n) {
		var sdat = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
		var ldat = this.ctx.createImageData(this.canvas.width * n, this.canvas.height * n)
		var xx, yy, aa, bb;
		for (xx = 0; xx < ldat.width; xx++) {
			for (yy = 0; yy < ldat.height; yy++) {
				aa = 4 * (xx + yy * ldat.width);
				bb = 4 * (Math.floor(xx/n) + Math.floor(yy/n) * ldat.width/n);
				ldat.data[aa]     = sdat.data[bb];
				ldat.data[aa + 1] = sdat.data[bb + 1];
				ldat.data[aa + 2] = sdat.data[bb + 2];
				ldat.data[aa + 3] = sdat.data[bb + 3];
			}
		}
		this.canvas.width *= n;
		this.canvas.height *= n;
		this.ctx.putImageData(ldat, 0, 0);
	}).bind(this);
	
	
	this.update = (function(){
		if(this.play){
			this.fpfcount ++;
			if(this.fpfcount>this.fpf){
				this.frame++;
				if(this.frame>=this.frames){
					this.frame = 0;
				}
				this.fpfcount = 0;
			}
		}
	}).bind(this);
	
	
	this.drawCurrentFrameAt = (function(ctx,x,y,r){
		this.drawFrameAt(ctx,this.frame,x,y,r);
	}).bind(this);
	
	
	this.drawFrameAt = (function(ctx,f,x,y,r){
		ctx.save();
			ctx.translate(x,y);
			ctx.rotate(r);
			var xx = f%this.columns;
			var yy = Math.floor(f/this.columns);
			//ctx.drawImage(this.canvas,  xx*this.dx,yy*this.dy,this.dx,this.dy, -this.dx/2, -this.dy/2, this.dx, this.dy);
			ctx.drawImage(this.canvas,  xx*this.dx,yy*this.dy,this.dx,this.dy, 0, 0, this.dx, this.dy);
		ctx.restore();
	}).bind(this);
	
	
	// ========== CONSTRUCTOR =====================
	
	this.canvas = document.createElement("canvas");
	this.canvas.width = 10;
	this.canvas.height = 10;
	this.ctx = this.canvas.getContext("2d");
	
	this.columns = acolumns;
	this.rows = arows;
	this.dx = 1;
	this.dy = 1;
	
	
	this.play = false;
	this.frame = 0;
	this.frames = 8;
	this.fpf = 1;
	this.fpfcount = 0;
	
	this.img = document.createElement("img");
	this.img.onload = this.onImgLoad;
	this.img.src = url;
}