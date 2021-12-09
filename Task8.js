function containsAllOf(s1, s2) {
	for (let i = 0; i < s2.length; i++) {
		if (!s1.includes(s2[i])) {
			return false;
		}
	}
	return true;
}

function matches(s1, s2) {
	return s1.length == s2.length && containsAllOf(s1, s2);
}

function task(lines) {
	let ones = 0, fours = 0, sevens = 0, eights = 0;
	let finalSum = 0;
	for (let i = 0; i < lines.length; i++) {
		let lineParts = lines[i].split(' | ');
		let inputs = lineParts[0].split(' ');
		let outputs = lineParts[1].split(' ');
		let keys = new Array(10);
		keys[8] = 'abcdefg';
		let zeroSixNine = new Array();
		let twoThreeFive = new Array();
		for (let input = 0; input < 10; input++) {
			if (inputs[input].length == 2) {
				keys[1] = inputs[input];
			} else if (inputs[input].length == 4) {
				keys[4] = inputs[input];
			} else if (inputs[input].length == 3) {
				keys[7] = inputs[input];
			} else if (inputs[input].length == 6) {
				zeroSixNine.push(inputs[input]);
			} else if (inputs[input].length == 5) {
				twoThreeFive.push(inputs[input]);
			}
		}
		for (let j = 0; j < 3; j++) {
			if (containsAllOf(zeroSixNine[j], keys[4])) {
				keys[9] = zeroSixNine.splice(j, 1)[0];
				break;
			}
		}
		if (containsAllOf(zeroSixNine[0], keys[1])) {
			keys[0] = zeroSixNine[0];
			keys[6] = zeroSixNine[1];
		} else {
			keys[0] = zeroSixNine[1];
			keys[6] = zeroSixNine[0];
		}
		for (let j = 0; j < 3; j++) {
			if (containsAllOf(twoThreeFive[j], keys[1])) {
				keys[3] = twoThreeFive.splice(j, 1)[0];
				break;
			}
		}
		let fourMinusOne = '';
		for (let j = 0; j < 4; j++) {
			if (!keys[1].includes(keys[4][j])) {
				fourMinusOne += keys[4][j];
			}
		}
		if (containsAllOf(twoThreeFive[0], fourMinusOne)) {
			keys[5] = twoThreeFive[0];
			keys[2] = twoThreeFive[1];
		} else {
			keys[5] = twoThreeFive[1];
			keys[2] = twoThreeFive[0];
		}
		
		for (let j = 0; j < outputs.length; j++) {
			for (let k = 0; k < 10; k++) {
				if (matches(outputs[j], keys[k])) {
					finalSum += k * Math.pow(10, outputs.length - j - 1);
				}
			}
			if (outputs[j].length == 2) {
				ones++;
			} else if (outputs[j].length == 4) {
				fours++;
			} else if (outputs[j].length == 3) {
				sevens++;
			} else if (outputs[j].length == 7) {
				eights++;
			}
		}
	}
	let simpleNumbers = ones + fours + sevens + eights;
	return new Array(simpleNumbers, finalSum);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = result[0];
	document.getElementById("result2").innerHTML = result[1];
}
