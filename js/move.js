console.log('move.js loaded');
function up(){
	for(var r = 0; r < 4; r++){
		for(var c = 0; c < 4; c++){		
			console.log('scan', r, c);
			if(grid[r][c].n === 1) continue;
			if(r < 3 && grid[r][c].n === grid[r+1][c].n){
				console.log('combine', r , c);
				grid[r][c].n *= 2;
				grid[r+1][c].n = 1;
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

function down(){
	for(var r = 3; r >= 0; r--){
		for(var c = 0; c < 4; c++){		
			console.log('scan', r, c);
			if(grid[r][c].n === 1) continue;
			if(r > 0 && grid[r][c].n === grid[r-1][c].n){
				console.log('combine', r , c);
				grid[r][c].n *= 2;
				grid[r-1][c].n = 1;
			}
			if(r >= 0 && r <= 2 && grid[r+1][c].n === 1){
				let next = r+1;
				while(next <= 3 && grid[next+1][c] === 1) next++;
				grid[next][c].n = grid[r][c].n;
				grid[r][c].n = 1;
				console.log('move down', r, c, next, c);
				continue;
			}
		}
	}
	render();
}

function left(){
	for(var c = 0; c < 4; c++){		
		for(var r = 0; r < 4; r++){
			console.log('scan', r, c);
			if(grid[r][c].n === 1) continue;
			if(c < 3 && grid[r][c].n === grid[r][c+1].n){
				console.log('combine', r , c);
				grid[r][c].n *= 2;
				grid[r][c+1].n = 1;
			}
			if(c > 0 && c < 4 && grid[r][c-1].n === 1){
				let next = c-1;
				while(next > 1 && grid[r][next-1] === 1) next--;
				grid[r][next].n = grid[r][c].n;
				grid[r][c].n = 1;
				console.log('left up', r, c, r, next);
				continue;
			}
		}
	}
	render();
}

function right(){
	for(var c = 3; c >= 0; c--){		
		for(var r = 0; r < 4; r++){
			console.log('scan', r, c);
			if(grid[r][c].n === 1) continue;
			if(c > 0 && grid[r][c].n === grid[r][c-1].n){
				console.log('combine', r , c);
				grid[r][c].n *= 2;
				grid[r][c-1].n = 1;
			}
			if(c >= 0 && c <= 2 && grid[r][c+1].n === 1){
				let next = c+1;
				while(next <= 3 && grid[r][next+1] === 1) next++;
				grid[r][next].n = grid[r][c].n;
				grid[r][c].n = 1;
				console.log('move right', r, c, r, next);
				continue;
			}
		}
	}
	render();
}

export {up, down, right, left}
