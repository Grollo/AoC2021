function task(lines) {
	let openers = '([{<';
	let closers = ')]}>'
	let syntaxPoints = [3, 57, 1197, 25137];
	let totalSyntaxPoints = 0;
	let autocompletePoints = new Array();
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		let chunkStack = new Array();
		let corrupt = false;
		for (let j = 0; j < line.length && !corrupt; j++) {
			let character = line[j];
			if (openers.includes(character)) {
				chunkStack.push(character);
			} else {
				let lastOpener = chunkStack.splice(chunkStack.length-1)[0];
				let expectedCloser = closers[openers.indexOf(lastOpener)];
				if (character != expectedCloser) {
					totalSyntaxPoints += syntaxPoints[closers.indexOf(character)];
					corrupt = true;
				}
			}
		}
		if (!corrupt) {
			let linePoints = 0;
			for (let j = chunkStack.length-1; j >= 0; j--) {
				linePoints *= 5;
				linePoints += openers.indexOf(chunkStack[j]) + 1;
			}
			autocompletePoints.push(linePoints);
		}
	}
	autocompletePoints.sort(function(a, b) {
		return b - a;
	});
	let middleScore = autocompletePoints[Math.floor(autocompletePoints.length / 2)];
	return new Array(totalSyntaxPoints, middleScore);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = result[0];
	document.getElementById("result2").innerHTML = result[1];
}
