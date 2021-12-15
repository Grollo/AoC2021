function addToVisitList(visitListX, visitListY, x, y) {
	for (let i = 0; i < visitListX.length; i++) {
		if (visitListX[i] == x && visitListY[i] == y) {
			return;
		}
	}
	visitListX.push(x);
	visitListY.push(y);
}

function checkFromVisit(riskMap, totalRiskMap, visitedMap, visitListX, visitListY, x1, y1, x2, y2) {
	let tenative = totalRiskMap[x2][y2];
	if (tenative == -1) {
		totalRiskMap[x2][y2] = totalRiskMap[x1][y1] + riskMap[x2][y2];
	} else {
		let newDistance = totalRiskMap[x1][y1] + riskMap[x2][y2];
		if (newDistance < tenative) {
			totalRiskMap[x2][y2] = newDistance;
			visitedMap[x2][y2] = false;
		}
	}
	if (!visitedMap[x2][y2]) {
		addToVisitList(visitListX, visitListY, x2, y2);
	}
}

function visit(sideLength, riskMap, totalRiskMap, visitedMap, visitListX, visitListY) {
	let x = visitListX.splice(0, 1)[0];
	let y = visitListY.splice(0, 1)[0];
	if (x != 0) {
		checkFromVisit(riskMap, totalRiskMap, visitedMap, visitListX, visitListY, x, y, x-1, y);
	}
	if (y != 0) {
		checkFromVisit(riskMap, totalRiskMap, visitedMap, visitListX, visitListY, x, y, x, y-1);
	}
	if (x+1 < sideLength) {
		checkFromVisit(riskMap, totalRiskMap, visitedMap, visitListX, visitListY, x, y, x+1, y);
	}
	if (y+1 < sideLength) {
		checkFromVisit(riskMap, totalRiskMap, visitedMap, visitListX, visitListY, x, y, x, y+1);
	}
	visitedMap[x][y] = true;
}

function task(lines) {
	let sideLength = lines.length;
	let riskMap = new Array();
	let totalRiskMap = new Array()
	let visitedMap = new Array()
	for (let i = 0; i < sideLength; i++) {
		let riskLine = new Array();
		for (let j = 0; j < sideLength; j++) {
			riskLine.push(parseInt(lines[i][j]));
		}
		riskMap.push(riskLine);
		let emptyLine = new Array(sideLength).fill(-1);
		totalRiskMap.push(emptyLine);
		let unvisitedLine = new Array(sideLength).fill(false);
		visitedMap.push(unvisitedLine);
	}
	totalRiskMap[0][0] = 0;
	let visitListX = [0];
	let visitListY = [0];
	while (visitListX.length > 0) {
		visit(sideLength, riskMap, totalRiskMap, visitedMap, visitListX, visitListY);
	}
	let result1 = totalRiskMap[sideLength-1][sideLength-1];
	let largeRiskMap = new Array();
	let largeTotalRiskMap = new Array()
	let largeVisitedMap = new Array()
	for (let i = 0; i < sideLength * 5; i++) {
		largeRiskMap.push(new Array(sideLength * 5).fill(0));
		largeTotalRiskMap.push(new Array(sideLength * 5).fill(-1));
		largeVisitedMap.push(new Array(sideLength * 5).fill(false));
	}
	let largeSideLength = largeRiskMap.length;
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			for (let x = 0; x < sideLength; x++) {
				for (let y = 0; y < sideLength; y++) {
					let risk = riskMap[x][y] + i + j;
					while (risk > 9) {
						risk -= 9;
					}
					largeRiskMap[x + sideLength * i][y + sideLength * j] = risk;
				}
			}
		}
	}
	largeTotalRiskMap[0][0] = 0;
	visitListX = [0];
	visitListY = [0];
	while (visitListX.length > 0) {
		visit(largeSideLength, largeRiskMap, largeTotalRiskMap, largeVisitedMap, visitListX, visitListY);
	}
	let result2 = largeTotalRiskMap[largeSideLength-1][largeSideLength-1];
	return new Array(result1, result2);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = result[0];
	document.getElementById("result2").innerHTML = result[1];
}
