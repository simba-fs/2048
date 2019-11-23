console.log('index.js loaded');
const color = ['#eee4da', '#ede0c8', '#f2b179', '#f59563', '#f67c5f', '#f65e3b', '#edcf72', '#edcc61', '#eccc61', '#eec74d', '#edc540'];
const col = [
	['#0-1', '#0-2', '#0-3', '#0-4'],
	['#1-1', '#1-2', '#1-3', '#1-4'],
	['#2-1', '#2-2', '#2-3', '#2-4'],
	['#3-1', '#3-2', '#3-3', '#3-4']
]
const tileTemplate = $('<div class="tile"></div').text(2);

var pool = [[],[],[],[]];

function remove(x, y){
	if(x && y) return;
	if(x > 3 || x < 0 || y > 3 || y < 0) return;
	delete pool[x][y];
}

function c(){
	for(var i = 0; i < 4; i++){
			console.log(i, pool[i][0].n, pool[i][1].n, pool[i][2].n, pool[i][3].n)
	}
}



class Tile{
	constructor(n = 2){
		n = Math.floor(Math.log2(n));
		this._n = Math.pow(2, n);
		this.x = 0;
		this.y = 0;
		this.tile = tileTemplate.clone()
			.data(this)
			.text(this.n)
			.css('background', color[n - 1]);
		console.log(n);

	}
	place(x = 0, y = 0){
		if(x < 0) x = 0;
		if(x > 3) x = 3;
		if(y < 0) y = 0;
		if(y > 3) y = 3;
		let target = $(`#${x}-${y}`);
		
		target.append(this.tile);

		this.x = x;
		this.y = y;
		this.tile.data(this);
		pool[x][y] = this;
	}

	get n(){
		return this._n;
	}

	set n(n){
		this._n = n;
		this.tile
			.text(n)
			.css('background-color', color[Math.log2(n) - 1]);
	}

	up(){
		if(this.x - 1 < 0) return;
		return pool[this.x - 1][this.y];
	}

	down(){
		if(this.x + 1 > 3) return;
		return pool[this.x + 1][this.y];
	}

	left(){
		if(this.y - 1 < 0) return;
		return pool[this.x][this.y - 1];
	}

	right(){
		if(this.y + 1 > 3) return;
		return pool[this.x][this.y + 1];
	}

	moveUp(){
		let target = this.up();
		if(!target) return this.place(this.x - 1, this.y);
		if(target.n !== this.n) return;
		if(target.n === this.n){
			this.n *= 2;
		}
		target.tile.remove();
		remove(this.x, this.y);
		this.place(this.x - 1, this.y);
	}

	moveDown(){
		let target = this.down();
		if(!target) return this.place(this.x + 1, this.y);
		if(target.n !== this.n) return;
		if(target.n === this.n){
			this.n *= 2;
		}
		target.tile.remove();
		remove(this.x, this.y);
		this.place(this.x + 1, this.y);
	}

	moveRight(){
		let target = this.right();
		if(!target) return this.place(this.x, this.y + 1);
		if(target.n !== this.n) return;
		if(target.n === this.n){
			this.n *= 2;
		}
		target.tile.remove();
		remove(this.x, this.y);
		this.place(this.x, this.y + 1);
	}

	moveLeft(){
		let target = this.left();
		if(!target) return this.place(this.x, this.y - 1);
		if(target.n !== this.n) return;
		if(target.n === this.n){
			this.n *= 2;
		}
		target.tile.remove();
		remove(this.x, this.y);
		this.place(this.x, this.y - 1);
	}

} 
/*
var a = new Tile();
a.place(1,1);
var b = new Tile();
b.place(2,1);
*/
/*
for(var i of [0,1,2,3]){
	for(var j of [0,1,2,3]){
		(()=>{
			var a = new Tile(2);
			a.place(i,j);
		})()
	}
}
*/
(new Tile()).place(0, 0);
(new Tile()).place(0, 1);
(new Tile()).place(0, 2);
(new Tile()).place(0, 3);
(new Tile()).place(1, 0);
(new Tile()).place(1, 1);
(new Tile()).place(1, 2);
(new Tile()).place(1, 3);
