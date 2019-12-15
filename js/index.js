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

function moveLine(line, reverse){
	if(reverse){
		line = [line[3], line[2], line[1], line[0]]; 
	}
	index = 1;
	while(index < 4){
		forward = index-1;
		while(forward >= 0 && line[forward].n === 1){
			line[forward].n = line[forward+1].n;
			line[forward+1].n = 1;
			forward --;
		}
		index ++;
	}
	
	if(line[0].n === line[1].n && line[0].n > 1){
		line[0].n *= 2;
		line[1].n = 1;
		// score += 2 ** line[1];
	}
	if(line[1].n === line[2].n && line[1].n > 1){
		line[1].n *= 2;
		line[2].n = 1;
		// score += 2 ** line[1];
	}
	if(line[2].n === line[3].n && line[2].n > 1){
		line[2].n *= 2;
		line[3].n = 1;
		// score += 2 ** line[2];
	}
	for(let i = 1; i <= 2; i++){
		if(line[i].n === 1){
			[line[i].n, line[i+1].n] = [line[i+1].n, 1];
		}
	}
	if(reverse){
		line = [line[3], line[2], line[1], line[0]];
	}
	return line;
}

function moveall(drc){
	if(drc === 0){
		for(i in [1, 2, 3, 4]){
			[grid[0][i], grid[1][i], grid[2][i], grid[3][i]] = 
				movealine([grid[0][i], grid[1][i], grid[2][i], grid[3][i]],false);
		}
		return;
	}
	if(drc === 1){
		for(i in [1, 2, 3, 4]){
			[grid[0][i], grid[1][i], grid[2][i], grid[3][i]] = 
				movealine([grid[0][i], grid[1][i], grid[2][i], grid[3][i]],true);
		}
		return;
	}
	if(drc === 2){
		for(i in [1, 2, 3, 4]){
			[grid[i][0], grid[i][1], grid[i][2], grid[i][3]] = 
				movealine([grid[i][0], grid[i][1], grid[i][2], grid[i][3]],false);
		}
		return;
	}
	if(drc === 3){
		for(i in [1, 2, 3, 4]){
			console.log('i: ', i);
			console.log('before', [grid[i][0], grid[i][1], grid[i][2], grid[i][3]]);
			console.log('after', movealine([grid[i][0], grid[i][1], grid[i][2], grid[i][3]]));
			[grid[i][0], grid[i][1], grid[i][2], grid[i][3]] = 
				movealine([grid[i][0], grid[i][1], grid[i][2], grid[i][3]],true);
		}
		return;
	}
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
