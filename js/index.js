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
		grid[i].push(new Tile(2048));
	}
}
// render the tiles to grid
function render(){
	const ground = $('#ground');
	for(var i = 0; i < 4; i++){
		var $row = ground.children().eq(i)
		for(var j = 0; j < 4; j++){
			debugger;
			var $grid = $row.children().eq(j);
			var tile = grid[i][j];
			$grid.append(tileTemplate.clone()
				.text(tile.n !== 1 ? tile.n : '')
				.addClass(`t${tile.n}`));
		}
	}
}
render();

