function markBasin(mark, x, y, basinMap, map) {
	if (basinMap[x][y] != -1 || map[x][y] == 9) {
		return;
	}
	basinMap[x][y] = mark;
	if (x != 0) {
		markBasin(mark, x-1, y, basinMap, map);
	}
	if (y != 0) {
		markBasin(mark, x, y-1, basinMap, map);
	}
	if (x+1 < map.length) {
		markBasin(mark, x+1, y, basinMap, map);
	}
	if (y+1 < map [0].length) {
		markBasin(mark, x, y+1, basinMap, map);
	}
}

function task(lines) {
	let map = new Array();
	let basinMap = new Array();
	let height = lines.length;
	let width = lines[0].length;
	for (let i = 0; i < lines.length; i++) {
		let line = new Array();
		for (let j = 0; j < width; j++) {
			line.push(parseInt(lines[i].charAt(j)));
		}
		map.push(line);
		let basinLine = new Array(width).fill(-1);
		basinMap.push(basinLine);
	}
	let risk = 0;
	let basinCounter = 0;
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			let localHeight = map[i][j];
			if ((i == 0 || map[i-1][j] > localHeight)
			&& (j == 0 || map[i][j-1] > localHeight)
			&& (i == height-1 || map[i+1][j] > localHeight)
			&& (j == width-1 || map[i][j+1] > localHeight)) {
				risk += 1 + localHeight;
				markBasin(basinCounter, i, j, basinMap, map);
				basinCounter++;
			}
		}
	}
	let basinSizes = new Array(basinCounter).fill(0);
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			let mark = basinMap[i][j];
			if (mark != -1) {
				basinSizes[mark]++;
			}
		}
	}
	basinSizes.sort(function(a, b) {
		return b - a;
	});
	let multSize = basinSizes[0] * basinSizes[1] * basinSizes[2];
	return new Array(risk, multSize);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = result[0];
	document.getElementById("result2").innerHTML = result[1];
}
