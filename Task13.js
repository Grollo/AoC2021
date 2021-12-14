function removeOverlap(pointsX, pointsY) {
	for (let i = 0; i < pointsX.length; i++) {
		for (let j = i+1; j < pointsX.length; j++) {
			if (pointsX[i] == pointsX[j] && pointsY[i] == pointsY[j]) {
				pointsX.splice(j, 1);
				pointsY.splice(j, 1);
				j--;
			}
		}
	}
}

function task(lines) {
	let pointsX = new Array();
	let pointsY = new Array();
	let foldOnX = new Array();
	let foldLines = new Array();
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].includes('fold')) {
			let lineParts = lines[i].split('=');
			foldOnX.push(lineParts[0].includes('x'));
			foldLines.push(parseInt(lineParts[1]));
		} else if (lines[i].includes(',')) {
			let lineParts = lines[i].split(',');
			pointsX.push(parseInt(lineParts[0]));
			pointsY.push(parseInt(lineParts[1]));
		}
	}
	let result1 = 0;
	for (let i = 0; i < foldLines.length; i++) {
		if (foldOnX[i]) {
			for (let j = 0; j < pointsX.length; j++) {
				if (pointsX[j] > foldLines[i]) {
					pointsX[j] -= (pointsX[j] - foldLines[i]) * 2;
				}
			}
		} else {
			for (let j = 0; j < pointsY.length; j++) {
				if (pointsY[j] > foldLines[i]) {
					pointsY[j] -= (pointsY[j] - foldLines[i]) * 2;
				}
			}
		}
		removeOverlap(pointsX, pointsY);
		if (i == 0) {
			result1 = pointsX.length;
		}
	}
	let highX = Math.max(...pointsX);
	let highY = Math.max(...pointsY);
	let printLines = new Array();
	for (let i = 0; i <= highY; i++) {
		printLines.push('.'.repeat(highX));
	}
	for (let i = 0; i < pointsX.length; i++) {
		let line = printLines[pointsY[i]];
		printLines[pointsY[i]] = line.substring(0, pointsX[i]) + '#' + line.substring(pointsX[i]+1);
	}
	let result2 = '';
	for (let i = 0; i < printLines.length; i++) {
		result2 += printLines[i] + '_';
	}
	return new Array(result1, result2);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = result[0];
	document.getElementById("result2").innerHTML = result[1];
}
