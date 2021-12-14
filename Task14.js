function addCount(map, key, count) {
	if (map.has(key)) {
		map.set(key, map.get(key) + count);
	} else {
		map.set(key, count);
	}
}

function applyRules(pairs, rules, insertions) {
	let newPairs = new Map();
	for (const [pair, count] of pairs.entries()) {
		let matchFound = false;
		for (let j = 0; j < rules.length && !matchFound; j++) {
			if (pair == rules[j]) {
				let leftPair = pair[0] + insertions[j];
				let rightPair = insertions[j] + pair[1];
				addCount(newPairs, leftPair, count);
				addCount(newPairs, rightPair, count);
				matchFound = true;
			}
		}
		if (!matchFound) {
			newOccurences.set(pair, count);
		}
	}
	return newPairs;
}

function occurrenceCount(pairs, start, end) {
	let letters = new Map();
	
	for (const [pair, count] of pairs.entries()) {
		addCount(letters, pair[0], count);
		addCount(letters, pair[1], count);
	}
	
	addCount(letters, start, 1);
	addCount(letters, end, 1);
	
	let max = letters.get(start);
	let min = letters.get(start);
	for (const [letter, count] of letters.entries()) {
		if (count > max) {
			max = count;
		}
		if (count < min) {
			min = count;
		}
	}
	return (max/2) - (min/2);
}

function task(lines) {
	let polymer = lines[0];
	let rules = new Array();
	let insertions = new Array();
	let pairs = new Map();
	let start = polymer[0];
	let end = polymer[polymer.length-1];
	for (let i = 2; i < lines.length; i++) {
		let lineParts = lines[i].split(' -> ');
		rules.push(lineParts[0]);
		insertions.push(lineParts[1]);
	}
	for (let i = 0; i < polymer.length-1; i++) {
		addCount(pairs, polymer.substring(i, i+2), 1)
	}
	for (let i = 0; i < 10; i++) {
		pairs = applyRules(pairs, rules, insertions);
	}
	let result1 = occurrenceCount(pairs, start, end);
	for (let i = 0; i < 30; i++) {
		pairs = applyRules(pairs, rules, insertions);
	}
	let result2 = occurrenceCount(pairs, start, end);
	return new Array(result1, result2);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = result[0];
	document.getElementById("result2").innerHTML = result[1];
}
