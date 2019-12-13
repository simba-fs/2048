console.log('index.js loaded');
//console.log = () => {};
var grid = [];

// define Tile class
class Tile{
	constructor(n = 1){
		this.n = Math.pow(2, Math.floor(Math.log2(n)));
	}
}

function initGrid(){
	grid.length = 0;
	for(var i = 0; i < 4; i++){
		grid.push([]);
		for(var j = 0; j < 4; j++){
			grid[i].push(new Tile(1));
		}
	}
}

function newTile(n = 2, r, c){
	var random = (n = 4) => Math.floor(Math.random()*n);
	if(r === undefined) r = random();
	if(c === undefined) c = random();
	while(grid[r][c].n !== 1){
		r = random();
		c = random();
	}
	console.log(r, c);
	grid[r][c].n = n;
}

function newGame(){
	initGrid();
	newTile(Math.random() > 0.8 ? 4 : 2, 0, 0);
	newTile(Math.random() > 0.8 ? 4 : 2, 0, 2);
	render();
}

// render tiles to grid
function render(){
	$('#tiles').children().each((index, item) => {
		// get row and col
		const $item = $(item);
		const cla = $item.attr('class').split(' ');
		const r = cla.filter((i) => i.charAt(0)=='r')[0].substr(1);
		const c = cla.filter((i) => i.charAt(0)=='c')[0].substr(1);
		const n = cla.filter((i) => i.charAt(0)=='n')[0].substr(1);
		if(grid[r][c].n !== n){
			$item
				.removeClass(`n${n}`)
				.addClass(`n${grid[r][c].n}`)
				.text(grid[r][c].n === 1 ? '' : grid[r][c].n);
		}
	});
}

function merge(a){
	// move
	for(var i in a){
		if(i === 0) continue;

		var next = i - 1;
		while(next >= 1 && a[next].n == 1) next--;
		console.log(i, next);
		a[i-1]= a[i];
		a[i] = 1;
		flag = true;
	}
}

//move

function up(){
	var flag = true;
	for(var r = 0; r < 4; r++){
		for(var c = 0; c < 4; c++){		
			console.log('scan', r, c);
			if(grid[r][c].n === 1) continue;
			// move
			if(r > 0 && r < 4 && grid[r-1][c].n === 1){
				let next = r-1;
				while(next >= 1 && grid[next-1][c].n === 1) next--;
				grid[next][c].n = grid[r][c].n;
				grid[r][c].n = 1;
				flag = false;
				console.log('move up', r, c, next, c, flag);
			}
			// merge
			if(r < 3 && grid[r][c].n === grid[r+1][c].n){
				grid[r][c].n *= 2;
				grid[r+1][c].n = 1;
				flag = false;
				console.log('merge', r , c, flag);
			}
			// move
			if(r > 0 && r < 4 && grid[r-1][c].n === 1){
				let next = r-1;
				while(next >= 1 && grid[next-1][c].n === 1) next--;
				grid[next][c].n = grid[r][c].n;
				grid[r][c].n = 1;
				flag = false;
				console.log('move up', r, c, next, c, flag);
			}
		}
	}
	flag || newTile();
	render();
}

function down(){
	var flag = true;
	for(var r = 3; r >= 0; r--){
		for(var c = 0; c < 4; c++){		
			console.log('scan', r, c);
			if(grid[r][c].n === 1) continue;
			//move
			if(r >= 0 && r <= 2 && grid[r+1][c].n === 1){
				let next = r+1;
				while(next <= 2 && grid[next+1][c].n === 1) next++;
				grid[next][c].n = grid[r][c].n;
				grid[r][c].n = 1;
				flag = false;
				console.log('move down', r, c, next, c, flag);
			}
			// merge
			if(r > 0 && grid[r][c].n === grid[r-1][c].n){
				grid[r][c].n *= 2;
				grid[r-1][c].n = 1;
				flag = false;
				console.log('merge', r , c, flag);
			}
			//move
			if(r >= 0 && r <= 2 && grid[r+1][c].n === 1){
				let next = r+1;
				while(next <= 2 && grid[next+1][c].n === 1) next++;
				grid[next][c].n = grid[r][c].n;
				grid[r][c].n = 1;
				flag = false;
				console.log('move down', r, c, next, c, flag);
			}
		}
	}
	flag || newTile();
	render();
}

function left(){
	var flag = true;
	for(var c = 0; c < 4; c++){		
		for(var r = 0; r < 4; r++){
			console.log('scan', r, c);
			if(grid[r][c].n === 1) continue;
			// move
			if(c > 0 && grid[r][c-1].n === 1){
				let next = c-1;
				while(next >= 1 && grid[r][next-1].n === 1) next--;
				grid[r][next].n = grid[r][c].n;
				grid[r][c].n = 1;
				flag = false;
				console.log('left up', r, c, r, next, flag);
			}
			console.log(grid);
			// merge
			if(c < 3 && grid[r][c].n === grid[r][c+1].n){
				grid[r][c].n *= 2;
				grid[r][c+1].n = 1;
				flag = false;
				console.log('merge', r , c, flag);
			}
			console.log(grid);
			// move
			if(c > 0 && c < 4 && grid[r][c-1].n === 1){
				let next = c-1;
				while(next >= 1 && grid[r][next-1].n === 1) next--;
				grid[r][next].n = grid[r][c].n;
				grid[r][c].n = 1;
				flag = false;
				console.log('left up', r, c, r, next, flag);
			}
			console.log(grid);
		}
	}
	flag || newTile();
	render();
}

function right(){
	var flag = true;
	for(var c = 3; c >= 0; c--){		
		for(var r = 0; r < 4; r++){
			console.log('scan', r, c);
			if(grid[r][c].n === 1) continue;
			// move
			if(c >= 0 && c <= 2 && grid[r][c+1].n === 1){
				let next = c+1;
				while(next <= 2 && grid[r][next+1].n === 1) next++;
				grid[r][next].n = grid[r][c].n;
				grid[r][c].n = 1;
				flag = false;
				console.log('move right', r, c, r, next, flag);
			}
			// merge
			if(c > 0 && grid[r][c].n === grid[r][c-1].n){
				grid[r][c].n *= 2;
				grid[r][c-1].n = 1;
				flag = false;
				console.log('merge', r , c, flag);
			}
			// move
			if(c >= 0 && c <= 2 && grid[r][c+1].n === 1){
				let next = c+1;
				while(next <= 2 && grid[r][next+1].n === 1) next++;
				grid[r][next].n = grid[r][c].n;
				grid[r][c].n = 1;
				flag = false;
				console.log('move right', r, c, r, next, flag);
			}
		}
	}
	flag || newTile();
	render();
}

function init(){
	newGame();
	
	const tileTemplate = $('<div class="tile"></div').text(2);
	const $tiles = $('#tiles');
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var tile = grid[i][j];
			$tiles.append(tileTemplate.clone()
				.text(tile.n !== 1 ? tile.n : '')
				.addClass(`n${tile.n} r${i} c${j}`));
		}
	}

	// bind key event
	
	$(document)
		.bind('keydown', 'up', up)
		.bind('keydown', 'down', down)
		.bind('keydown', 'left', left)
		.bind('keydown', 'right', right);
}

init();

// test code

/*
grid[1][0].n = 2;
grid[3][0].n = 2;
render();
*/
