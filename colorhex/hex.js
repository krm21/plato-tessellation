const mod = (x, n) => (x % n + n) % n;

class Hex{

	constructor(row, col, c){
		if( row>=0 && col>=0 ){
			this.row = row;
			this.col = col;
			this.c = c;
		} else {
			throw new Error("wrong argument exception");
		}
	}
	
	draw = () => {
		if( ((this.col) % 2) === 0 ){
			draw_down(90*this.col, 52+104*this.row, this.c);
		} else {
			draw_down(90*this.col, 104+104*this.row, this.c);
		}
	}

	setColor = c => {
		this.c = c;
		this.draw();
	};

	getColor = () => this.c;
}

class Site{
	constructor(){

		this.WIDTH = 41;
		this.HEIGHT = 12;

		this.clrs = ["white"];

		this.colored = []

		this.table = [];

		for(let row=0; row<this.HEIGHT; row++){
			this.table[row] = [];
			this.colored[row] = [];
			for(let col=0; col<this.WIDTH; col++){
				this.colored[row][col] = false;
				this.table[row][col] = new Hex(row, col, this.clrs[mod(row-col, this.clrs.length)]);
				this.table[row][col].draw();
			}
		}
	}

	setColor = (row, col, c) => {
		this.table[row][col].setColor(c);
		this.colored[row][col] = true;
	}

	getColor = (row, col) => this.table[row][col].getColor();

	getCellsIndex = (i, j) => {
		let cellList = [];
		cellList.push([i, 2*j]);
		cellList.push([i, 2*j+1]);
		cellList.push([i, 2*j+2]);
		return cellList;
	}

	getCells = (i, j) => {
		let cellList = [];
		cellList.push(this.table[i][2*j]);
		cellList.push(this.table[i][2*j+1]);
		cellList.push(this.table[i][2*j+2]);
		return cellList;
	}

	getCellsColored = (i, j) => {
		let cellList = [];
		cellList.push(this.colored[i][2*j]);
		cellList.push(this.colored[i][2*j+1]);
		cellList.push(this.colored[i][2*j+2]);
		return cellList;
	}

	isReady = (i, j) => {
		let count = 0;
		if(this.colored[i][2*j]) count++;
		if(this.colored[i][2*j+1]) count++;
		if(this.colored[i][2*j+2]) count++;
		return (count>1 && count<6);
	}

	fillPattern = (newTile, pattern) => {
		let pattern_clr = pattern.map(x => x.c);
		let newTile_clr = newTile.map(x => x.c);
		let colored = this.getCellsColored();
		for(let i=0; i<pattern_clr.length; i++){
			for(let el of colored){
				
			}
		}
	}

	run = () => {
		let rrow = randomrwo;
		let rcol = randomcol;
		if(isReady(rrow, rcol)){
			this.fillPattern(this.getCells(rrow, rcol), this.getCells(0, 0));
		}
	}
}


function draw_down(x, y, c){
	const canvas = document.getElementById('canvas');
	if(canvas.getContext){
		const ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x+30, y-52);
		ctx.lineTo(x+90, y-52);
		ctx.lineTo(x+120, y);
		ctx.lineTo(x+90, y+52);
		ctx.lineTo(x+30, y+52);
		ctx.fillStyle = c;
		ctx.fill()
		ctx.closePath();
		ctx.stroke();
	}
}

function getCol(x, y){
	let rv = 0;
	let i = 0;
	let y_correction = 0;
	while(rv<401){
		i=0;
		while(i<12){
			y_correction = rv<=0 ? 0 : Math.max(0, -1+2*Math.floor((rv+2)/2));
			if((y<=(-1.73*x+52+104*(i+2+2*rv))) && (y>=(1.73*x+52+104*(i-2-y_correction)))){
				console.log("f(" + rv + ") = " + y_correction);
				return rv;
			}
			i++;
		}
		rv++;
	}
}

function getColEvenRow(x, y){
	let rv = 0;
	while(true){
		if(x<0.5774*y+(30*(rv+1))){
			return rv;
		}
		rv++;
		if(x<-0.5774*y+(30*(rv+2))){
			return rv;
		}
		rv++;
	}
}

function getColOddRow(x, y){
	let rv = 0;
	while(true){
		if(x<-0.5774*y+30*(rv+2)){
			return rv;
		}
		rv++;
		if(x<0.5774*y+30*(rv+1)){
			return rv;
		}
		rv++;
	}
}

let site = new Site();
// console.log(site.isReady(0, 0));
let c = document.getElementById('canvas');
c.addEventListener("click", e=>{
	let row = Math.floor(e.clientY/52);
	let relativeY = e.clientY-row*52;
	console.log(getCol(e.clientX, e.clientY));
	let col = 0;
	if(row%2===0){
		col = getColEvenRow(e.clientX, relativeY);
	} else {
		col = getColOddRow(e.clientX, relativeY);
	}
	let cc = ["#BBBBBB", "#CC231E", "#2f7d32", "gold", "#FFFFFF"];
	site.setColor(Math.round(0.4*row), Math.round(0.3*col), cc[(cc.indexOf(site.getColor(row, col))+1) % cc.length]);
});