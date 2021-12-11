function flash(octopuses, i, j){
	let subFlashes = 1;
	octopuses[i][j] = 0;
	
	for (let iDiff = -1; iDiff <= 1; iDiff++) {
		for (let jDiff = -1; jDiff <= 1; jDiff++) {
			if ((iDiff == 0 && jDiff == 0)
			|| (i+iDiff < 0)
			|| (j+jDiff < 0)
			|| (i+iDiff >= octopuses.length)
			|| (j+jDiff >= octopuses[i].length)) {
				continue;
			}
			if (octopuses[i+iDiff][j+jDiff] != 0) {
				octopuses[i+iDiff][j+jDiff]++;
				
				if (octopuses[i+iDiff][j+jDiff] > 9) {
					subFlashes += flash(octopuses, i+iDiff, j+jDiff);
				}
			}
		}
	}
	return subFlashes;
}

function task(lines) {
	let octopuses = new Array();
	for (let i = 0; i < lines.length; i++) {
		let line = new Array();
		for (let j = 0; j < lines[i].length; j++) {
			line.push(parseInt(lines[i][j]));
		}
		octopuses.push(line);
	}
	let totalFlashes = 0;
	let flashesAfter100 = 0;
	let synchronizedFlashStep = -1;
	for (let step = 1; step <= 100 || synchronizedFlashStep == -1; step++) {
		for (let i = 0; i < octopuses.length; i++) {
			for (let j = 0; j < octopuses[i].length; j++) {
				octopuses[i][j]++;
			}
		}
		for (let i = 0; i < octopuses.length; i++) {
			for (let j = 0; j < octopuses[i].length; j++) {
				if (octopuses[i][j] > 9) {
					totalFlashes += flash(octopuses, i, j);
				}
			}
		}
		if (step == 100) {
			flashesAfter100 = totalFlashes;
		}
		if (synchronizedFlashStep == -1) {
			let allFlashed = true;
			for (let i = 0; i < octopuses.length && allFlashed; i++) {
				for (let j = 0; j < octopuses[i].length && allFlashed; j++) {
					allFlashed &= octopuses[i][j] == 0;
				}
			}
			if (allFlashed) {
				synchronizedFlashStep = step;
			}
		}
	}
	return new Array(flashesAfter100, synchronizedFlashStep);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = result[0];
	document.getElementById("result2").innerHTML = result[1];
}
