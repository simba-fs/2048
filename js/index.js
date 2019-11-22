console.log('index.js loaded');
const color = ['#eee4da', '#ede0c8', '#f2b179', '#f59563', '#f67c5f', '#f65e3b', '#edcf72', '#edcc61', '#eccc61', '#eec74d', '#edc540'];
const col = [
	['#1-1', '#1-2', '#1-3', '#1-4'],
	['#2-1', '#2-2', '#2-3', '#2-4'],
	['#3-1', '#3-2', '#3-3', '#3-4'],
	['#4-1', '#4-2', '#4-3', '#4-4']
]
const tileTemplate = $('<div class="tile"></div').text(2);

var pool = [];

class Tile{
	constructor(n = 2){
		this.n = n;
		this.x = 0;
		this.y = 0;
		this.tile = tileTemplate.clone().data(this);
		pool.push(this);
		console.log({...pool});
		pool.sort((a, b) => {
			if(a.y < b.y) return 1;
			if(a.y > b.y) return -1;
			if(a.y == b.y) return 0;
			if(a.x < b.x) return 1;
			if(a.x > b.x) return -1;
			if(a.x == b.x) return 0;
			return 0;
		});

	}
	place(x = 1, y = 1){
		let target = $(`#${x}-${y}`);
		
		// check if the place is empty
		if(target.children().length === 1) return 1;

		target.append(this.tile);
		this.x = x;
		this.y = y;
		this.tile.data(this);
	}

	moveUp(){
		let target = this.up();
		let data = {...target.data()}
			console.log(data);
		if(data.n=== this.n){
			target.remove();
			
			this.place(data.x, data.y);
		}
	}
} 
/*
var a = new Tile();
a.place(1,1);
var b = new Tile();
b.place(2,1);
*/
for(var i of [1,2,3,4]){
	for(var j of [1,2,3,4]){
		(()=>{
			var a = new Tile();
			a.place(i,j);
		})()
	}
}
