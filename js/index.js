;
const color = ['#eee4da', '#ede0c8', '#f2b179', '#f59563', '#f67c5f', '#f65e3b', '#edcf72', '#edcc61', '#eccc61', '#eec74d', '#edc540'];
const col = [
	['#1-1', '#1-2', '#1-3', '#1-4'],
	['#2-1', '#2-2', '#2-3', '#2-4'],
	['#3-1', '#3-2', '#3-3', '#3-4'],
	['#4-1', '#4-2', '#4-3', '#4-4']
]
const tile = $('<div class="tile"></div').text(2);

for(let i of col){
	for(let j of i){
		$(j).append(tile.clone());
	};
};
;
