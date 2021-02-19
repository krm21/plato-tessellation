const mod = (x, n) => (x % n + n) % n;

class Square{

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
		draw_down(60*this.col, 60*this.row, this.c);
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
				this.table[row][col] = new Square(row, col, this.clrs[mod(row-col, this.clrs.length)]);
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
		cellList.push([i, j]);
		cellList.push([i, j+1]);
		cellList.push([i+1, j+1]);
		cellList.push([i+1, j]);
		return cellList;
	}

	getCells = (i, j) => {
		let cellList = [];
		cellList.push(this.table[i][j]);
		cellList.push(this.table[i][j+1]);
		cellList.push(this.table[i+1][j+1]);
		cellList.push(this.table[i+1][j]);
		return cellList;
	}

	getCellsColored = (i, j) => {
		let cellList = [];
		cellList.push(this.colored[i][j]);
		cellList.push(this.colored[i][j+1]);
		cellList.push(this.colored[i+1][j+1]);
		cellList.push(this.colored[i+1][j]);
		return cellList;
	}

	isReady = (i, j) => {
		let count = 0;
		if(i%2===0){
			if(this.colored[i][2*j]) count++;
			if(this.colored[i][2*j+1]) count++;
			if(this.colored[i][2*j+2]) count++;
			if(this.colored[i+1][2*j+2]) count++;
			if(this.colored[i+1][2*j+1]) count++;
			if(this.colored[i+1][2*j]) count++;
		} else {
			if(this.colored[i][2*j+1]) count++;
			if(this.colored[i][2*j+2]) count++;
			if(this.colored[i][2*j+3]) count++;
			if(this.colored[i+1][2*j+3]) count++;
			if(this.colored[i+1][2*j+2]) count++;
			if(this.colored[i+1][2*j+1]) count++;
		}
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
		ctx.lineTo(x+60, y);
		ctx.lineTo(x+60, y+60);
		ctx.lineTo(x, y+60);
		ctx.fillStyle = c;
		ctx.fill()
		ctx.closePath();
		ctx.stroke();
	}
}

// function draw_up(x, y, c){
// 	const canvas = document.getElementById('canvas');
// 	if(canvas.getContext){
// 		const ctx = canvas.getContext('2d');
// 		ctx.beginPath();
// 		ctx.moveTo(x, y+52);
// 		ctx.lineTo(x+30, y);
// 		ctx.lineTo(x+60, y+52);
// 		ctx.fillStyle = c;
// 		ctx.fill()
// 		ctx.closePath();
// 		ctx.stroke();
// 	}
// }

// function getColEvenRow(x, y){
// 	let rv = 0;
// 	while(true){
// 		if(x<0.5774*y+(30*(rv+1))){
// 			return rv;
// 		}
// 		rv++;
// 		if(x<-0.5774*y+(30*(rv+2))){
// 			return rv;
// 		}
// 		rv++;
// 	}
// }

// function getColOddRow(x, y){
// 	let rv = 0;
// 	while(true){
// 		if(x<-0.5774*y+30*(rv+2)){
// 			return rv;
// 		}
// 		rv++;
// 		if(x<0.5774*y+30*(rv+1)){
// 			return rv;
// 		}
// 		rv++;
// 	}
// }

let site = new Site();
// console.log(site.isReady(0, 0));
let c = document.getElementById('canvas');
c.addEventListener("click", e=>{
	let row = Math.floor(e.clientY/60);
	let relativeY = e.clientY-row*60;
	let col = Math.floor(e.clientX/60);
	// if(row%2===0){
	// 	col = getColEvenRow(e.clientX, relativeY);
	// } else {
	// 	col = getColOddRow(e.clientX, relativeY);
	// }
	// console.log(col);
	// let col = Math.floor(e.clientX/30);
	// site.setColor(row, col, "red");
	// let cc = ["#BBBBBB", "#CC231E", "#0ba320", "#345eeb", "#FFFFFF"];
	let cc = ["#BBBBBB", "#CC231E", "#2f7d32", "gold", "#FFFFFF"];
	site.setColor(row, col, cc[(cc.indexOf(site.getColor(row, col))+1) % cc.length]);
});

// setInterval(
// 	() => {
// 		let randr = Math.floor(Math.random()*10);
// 		let randc = Math.floor(Math.random()*19);
// 		let tempcolor = "pink";
// 		if(site.isReady(randr, randc)){
// 			let cellindexlist = site.getCellsIndex(randr, randc);
// 			for(let el of cellindexlist){
// 				if(site.getColor(el[0], el[1])!=="white"){
// 					tempcolor = site.getColor(el[0], el[1]);
// 					break;
// 				}
// 			}
// 			cellindexlist.map(pair=>site.setColor(pair[0], pair[1], tempcolor));
// 		}
// 	}
// , 50)


// console.log(site.table[2].length);