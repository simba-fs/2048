function movealine(line, reverse){
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
