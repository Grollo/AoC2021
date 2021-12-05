function task(lines) {
	let highestX = 0, highestY = 0;
	let startX = new Array(), startY = new Array(), endX = new Array(), endY = new Array();
	for (let i = 0; i < lines.length; i++) {
		let lineParts = lines[i].split(' -> ');
		let startCoordinates = lineParts[0].split(',');
		let endCoordinates = lineParts[1].split(',');
		let x1 = parseInt(startCoordinates[0]);
		let y1 = parseInt(startCoordinates[1]);
		let x2 = parseInt(endCoordinates[0]);
		let y2 = parseInt(endCoordinates[1]);
		highestX = Math.max(highestX, x1, x2);
		highestY = Math.max(highestY, y1, y2);
		startX.push(x1);
		startY.push(y1);
		endX.push(x2);
		endY.push(y2);
	}
	highestX++;
	highestY++;
	let emptyRow = new Array(highestY).fill(0);
	let map = new Array();
	for (let i = 0; i < highestX; i++) {
		let newEmpty = emptyRow.slice();
		map.push(newEmpty);
	}
	for (let i = 0; i < startX.length; i++) {
		let lowX = Math.min(startX[i], endX[i]);
		let highX = Math.max(startX[i], endX[i]);
		let lowY = Math.min(startY[i], endY[i]);
		let highY = Math.max(startY[i], endY[i]);
		if (startX[i] == endX[i]) {
			for (let yCoord = lowY; yCoord <= highY; yCoord++) {
				map[startX[i]][yCoord]++;
			}
		} else if (startY[i] == endY[i]) {
			for (let xCoord = lowX; xCoord <= highX; xCoord++) {
				map[xCoord][startY[i]]++;
			}
		} else {
			if (endX[i] - startX[i] == endY[i] - startY[i]) {
				let xCoord = lowX;
				for (let yCoord = lowY; yCoord <= highY; yCoord++) {
					map[xCoord][yCoord]++;
					xCoord++;
				}
			} else {
				let xCoord = highX;
				for (let yCoord = lowY; yCoord <= highY; yCoord++) {
					map[xCoord][yCoord]++;
					xCoord--;
				}
			}
		}
	}
	let dangerousVents = 0;
	for (let x = 0; x < highestX; x++) {
		for (let y = 0; y < highestY; y++) {
			if (map[x][y] >= 2) {
				dangerousVents++;
			}
		}
	}
	return dangerousVents;
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	document.getElementById("result1").innerHTML = task(allLines);
}
