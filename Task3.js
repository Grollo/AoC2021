function bitStringToInt(bitString) {
	let nrbOfBits = bitString.length;
	let exponent = nrbOfBits - 1;
	let result = 0;
	for (let bitPos = 0; bitPos < nrbOfBits; bitPos++) {
		if (bitString[bitPos] == '1') {
			result += 1 << exponent;
		}
		exponent--;
	}
	return result;
}

function task(lines) {
	let gamma = 0, epsilon = 0;
	let nrbOfBits = lines[0].length;
	let exponent = nrbOfBits - 1;
	let oxygenCandidates = lines.slice(), co2Candidates = lines.slice();
	for (let bitPos = 0; bitPos < nrbOfBits; bitPos++) {
		let numOnes = 0;
		for (let line = 0; line < lines.length; line++) {
			numOnes += lines[line][bitPos] == '1';
		}
		if (numOnes >= lines.length / 2) {
			gamma += 1 << exponent;
		} else {
			epsilon += 1 << exponent;
		}
		if (oxygenCandidates.length > 1) {
			numOnes = 0;
			for (let i = 0; i < oxygenCandidates.length; i++) {
				if (oxygenCandidates[i][bitPos] == '1') {
					numOnes++;
				}
			}
			let mostCommon = numOnes  >= oxygenCandidates.length / 2 ? '1' : '0';
			for (let i = 0; i < oxygenCandidates.length; i++) {
				if (oxygenCandidates[i][bitPos] != mostCommon) {
					oxygenCandidates.splice(i, 1);
					i--;
				}
			}
		}
		if (co2Candidates.length > 1) {
			numOnes = 0;
			for (let i = 0; i < co2Candidates.length; i++) {
				if (co2Candidates[i][bitPos] == '1') {
					numOnes++;
				}
			}
			let mostCommon = numOnes  >= co2Candidates.length / 2 ? '1' : '0';
			for (let i = 0; i < co2Candidates.length; i++) {
				if (co2Candidates[i][bitPos] == mostCommon) {
					co2Candidates.splice(i, 1);
					i--;
				}
			}
		}
		exponent--;
	}
	let result1 = gamma * epsilon;
	let result2 = bitStringToInt(oxygenCandidates[0]) * bitStringToInt(co2Candidates[0]);
	return new Array(result1, result2);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let numbers = new Array();
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = result[0];
	document.getElementById("result2").innerHTML = result[1];
}
