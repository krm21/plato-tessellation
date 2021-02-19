const mod = (x, n) => (x % n + n) % n;

class Tile{
	constructor(li){
		this.li = li;
	}
}

class Triangle{

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
		if( ((this.row+this.col) % 2) === 0 ){
			draw_up(30*this.col, 52*this.row, this.c);
		} else {
			draw_down(30*this.col, 52*this.row, this.c);
		}
	}

	setColor = c => {
		this.c = c;
		this.draw();
	};
}

class Site{
	constructor(){

		this.WIDTH = 41;
		this.HEIGHT = 12;

		this.clrs = ["#000", "#444", "#888", "#BBB", "red", "crimson", "#FF4D00"];

		this.colored = []

		this.table = [];

		for(let row=0; row<this.HEIGHT; row++){
			this.table[row] = [];
			this.colored[row] = [];
			for(let col=0; col<this.WIDTH; col++){
				this.colored[row][col] = false;
				this.table[row][col] = new Triangle(row, col, this.clrs[mod(row-col, this.clrs.length)]);
				this.table[row][col].draw();
			}
		}
		this.start = ["red", "pink", "blue", "green", "yellow", "white"];
		this.setColor(0, 0, this.start[0]);
		this.setColor(0, 1, this.start[1]);
		this.setColor(0, 2, this.start[2]);
		this.setColor(1, 2, this.start[3]);
		this.setColor(1, 1, this.start[4]);
		this.setColor(1, 0, this.start[5]);
	}

	setColor = (row, col, c) => {
		this.table[row][col].setColor(c);
		this.colored[row][col] = true;
	}

	getCells = (i, j) => {
		let cellList = [];
		if(i%2===0){
			cellList.push(table[i][2*j]);
			cellList.push(table[i][2*j+1]);
			cellList.push(table[i][2*j+2]);
			cellList.push(table[i+1][2*j+2]);
			cellList.push(table[i+1][2*j+1]);
			cellList.push(table[i+1][2*j]);
		} else {
			cellList.push(table[i][2*j+1]);
			cellList.push(table[i][2*j+2]);
			cellList.push(table[i][2*j+3]);
			cellList.push(table[i+1][2*j+3]);
			cellList.push(table[i+1][2*j+2]);
			cellList.push(table[i+1][2*j+1]);
		}
		return cellList;
	}

	getCellsColored = (i, j) => {
		let cellList = [];
		if(i%2===0){
			cellList.push(colored[i][2*j]);
			cellList.push(colored[i][2*j+1]);
			cellList.push(colored[i][2*j+2]);
			cellList.push(colored[i+1][2*j+2]);
			cellList.push(colored[i+1][2*j+1]);
			cellList.push(colored[i+1][2*j]);
		} else {
			cellList.push(colored[i][2*j+1]);
			cellList.push(colored[i][2*j+2]);
			cellList.push(colored[i][2*j+3]);
			cellList.push(colored[i+1][2*j+3]);
			cellList.push(colored[i+1][2*j+2]);
			cellList.push(colored[i+1][2*j+1]);
		}
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
		ctx.lineTo(x+30, y+52);
		ctx.lineTo(x+60, y);
		ctx.fillStyle = c;
		ctx.fill()
	}
}

function draw_up(x, y, c){
	const canvas = document.getElementById('canvas');
	if(canvas.getContext){
		const ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(x, y+52);
		ctx.lineTo(x+30, y);
		ctx.lineTo(x+60, y+52);
		ctx.fillStyle = c;
		ctx.fill()
	}
}

// let colored = Array.from(table, col => Array.from(col).fill(false));

let site = new Site();
console.log(site.isReady(0, 0));
// for(let i=0; i<(HEIGHT-1); i++){
// 	for(let j=0; j<WIDTH/2-2; j++){
// 		for(let el of getCells(i, j)){
// 			el.setColor("pink");
// 		}
// 	}
// }

// for(let el of getCells(1, 1)){
// 	el.setColor("white");
// }

// setInterval(()=>{
// 	let i = Math.floor(Math.random()*41);
// 	let j = Math.floor(Math.random()*12);
// 	table[i][j].setColor(clrs[mod(Math.floor(Math.random()*1000), clrs.length)]);
// }, 10);
