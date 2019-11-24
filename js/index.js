console.log('index.js loaded');
const tileTemplate = $('<div class="tile"></div').text(2);
i
// define Tile class
class Tile{
	constructor(n = 1){
		this.n = Math.pow(2, Math.floor(Math.log2(n)));
	}
}

//init grid

var grid = [];

for(var i = 0; i < 4; i++){
	grid.push([]);
	for(var j = 0; j < 4; j++){
		grid[i].push(new Tile(2));
	}
}
// render tiles to grid
function render(){
	const $tiles = $('#tiles');
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var tile = grid[i][j];
			$tiles.append(tileTemplate.clone()
				.text(tile.n !== 1 ? tile.n : '')
				.addClass(`n${tile.n} r${i} c${j}`));
		}
	}
}

function up(){
	for(var r = 0; r < 4; r++){
		for(var c = 0; c < 4; c++){		
			console.log('scan', r, c);
			if(grid[r][c].n === 1) continue;
			if(r < 3 && grid[r][c].n === grid[r+1][c].n){
				console.log('combine', r , c);
				grid[r][c].n *= 2;
				grid[r+1][c].n = 1;
				continue;
			}
			if(r > 0 && r < 4 && grid[r-1][c].n === 1){
				let next = r-1;
				while(next > 1 && grid[next-1][c] === 1) next--;
				grid[next][c].n = grid[r][c].n;
				grid[r][c].n = 1;
				console.log('move up', r, c, next, c);
				continue;
			}
			
		}
	}
	render();
}

// test code

grid[1][0].n = 2;
grid[3][0].n = 2;
render();
