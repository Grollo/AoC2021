function task(lines) {
	let ones = 0, fours = 0, sevens = 0, eights = 0;
	for (let i = 0; i < lines.length; i++) {
		let lineParts = lines[i].split(' | ');
		let inputs = lineParts[0].split(' ');
		let outputs = lineParts[1].split(' ');
		for (let j = 0; j < outputs.length; j++) {
			if (outputs[j].length == 2) {
				ones++;
			} else if (outputs[j].length == 4) {
				fours++;
			} else if (outputs[j].length == 3) {
				fours++;
			} else if (outputs[j].length == 7) {
				eights++;
			}
		}
		
	}
	let simpleNumbers = ones + fours + sevens + eights;
	/*
	I don't have the patience to program this, so I'll just describe the solution.
	Functions every() and includes() would be used. 
	First, a 1, 4 7 or 8 can be distinguished as above.
	Second, The group with lengh of six is 0, 6 and 9.
	9 can be distinguished as the only one to have all elements from 4.
	0 is then the one of the remaining two which has all elements of 1 (or 7). 
	Third, 2, 3, and 5 have length five so they are grouped together.
	3 can be separated out as it is the only one to contain both elements of 1.
	5 can the be separated out as the only one to contain the elements of 4 that doesn't appear in 1.
	Now just motiply each number by its position (1000, 100, 10 or 1) and add it all up. Just saved an hour of my life. 
	*/
	return new Array(simpleNumbers, 0);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = result[0];
	document.getElementById("result2").innerHTML = result[1];
}
