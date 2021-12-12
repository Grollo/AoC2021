function isLargeCave(cave) {
	return cave == cave.toUpperCase();
}

function hasTwoSmallCaves(path) {
	let smallCaves = new Array();
	for (let i = 0; i < path.length; i++) {
		if (!isLargeCave(path[i]) && smallCaves.includes(path[i])) {
			return true;
		}
		smallCaves.push(path[i]);
	}
	return false;
}

function traverse(pathsFrom, pathsTo, ends, currentPath, visitASmallCaveTwice) {
	let foundPaths = 0;
	let currentCave = currentPath[currentPath.length-1];
	for (let i = 0; i < pathsFrom.length; i++) {
		if (pathsFrom[i] == currentCave && (isLargeCave(pathsTo[i]) || !currentPath.includes(pathsTo[i]) || (visitASmallCaveTwice && !hasTwoSmallCaves(currentPath)))) {
			let pathCopy = currentPath.slice();
			pathCopy.push(pathsTo[i]);
			foundPaths += traverse(pathsFrom, pathsTo, ends, pathCopy, visitASmallCaveTwice);
		}
	}
	if (ends.includes(currentCave)) {
		foundPaths++;
	}
	return foundPaths;
}

function task(lines) {
	let pathsFrom = new Array();
	let pathsTo = new Array();
	let beginnings = new Array();
	let ends = new Array();
	for (let i = 0; i < lines.length; i++) {
		let parts = lines[i].split('-');
		if (parts[0] == 'start') {
			beginnings.push(parts[1]);
		} else if (parts[1] == 'start') {
			beginnings.push(parts[0]);
		} else if(parts[0] == 'end') {
			ends.push(parts[1]);
		} else if(parts[1] == 'end') {
			ends.push(parts[0]);
		} else {
			pathsFrom.push(parts[0]);
			pathsTo.push(parts[1]);
			pathsFrom.push(parts[1]);
			pathsTo.push(parts[0]);
		}
	}
	let totalPaths = 0;
	for (let i = 0; i < beginnings.length; i++) {
		totalPaths += traverse(pathsFrom, pathsTo, ends, [beginnings[i]], false);
	}
	let totalPaths2 = 0;
	for (let i = 0; i < beginnings.length; i++) {
		totalPaths2 += traverse(pathsFrom, pathsTo, ends, [beginnings[i]], true);
	}
	return new Array(totalPaths, totalPaths2);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = result[0];
	document.getElementById("result2").innerHTML = result[1];
}
