function movealine(line, reverse){
	if(reverse){
		line = [line[3], line[2], line[1], line[0]]; 
	}
	index = 1;
	while(index < 4){
		forward = index-1;
		while(forward >= 0 && line[forward] === 0){
			line[forward] = line[forward+1];
			line[forward+1] = 0;
			forward --;
		}
		index ++;
	}
	
	if(line[0] === line[1] && line[0] > 0){
		line[0] ++;
		line[1] = 0;
		// score += 2 ** line[1];
	}
	if(line[1] === line[2] && line[1] > 0){
		line[1] += 1;
		line[2] = 0;
		// score += 2 ** line[1];
	}
	if(line[2] === line[3] && line[2] > 0){
		line[2] += 1;
		line[3] = 0;
		// score += 2 ** line[2];
	}
	for(let i = 1; i <= 2; i++){
		if(line[i] === 0){
			[line[i], line[i+1]] = [line[i+1], 0];
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
				movealine([grid[0][i], grid[1][i], grid[2][i], grid[3][i]],False);
		}
		return;
	}
	if(drc === 1){
		for(i in [1, 2, 3, 4]){
			[grid[0][i], grid[1][i], grid[2][i], grid[3][i]] = 
				movealine([grid[0][i], grid[1][i], grid[2][i], grid[3][i]],True);
		}
		return;
	}
	if(drc === 2){
		for(i in [1, 2, 3, 4]){
			[grid[i][0], grid[i][1], grid[i][2], grid[i][3]] = 
				movealine([grid[i][0], grid[i][1], grid[i][2], grid[i][3]],False);
		}
		return;
	}
	if(drc === 3){
		for(i in [1, 2, 3, 4]){
			[grid[i][0], grid[i][1], grid[i][2], grid[i][3]] = 
				movealine([grid[i][0], grid[i][1], grid[i][2], grid[i][3]],True);
		}
		return;
	}
