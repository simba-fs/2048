console.log('index.js loaded');
const tileTemplate = $('<div class="tile"></div').text(2);

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
		grid[i].push(new Tile(1));
	}
}
// render the tiles to grid
function render(){
	const $tiles = $('#tiles');
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var tile = grid[i][j];
			$tiles.append(tileTemplate.clone()
				.text(tile.n !== 1 ? tile.n : '')
				.addClass(`n${tile.n}`));
		}
	}
}
render();

