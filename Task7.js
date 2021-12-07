function countFuel(position, crabs) {
	let fuel = 0;
	for (let i = 0; i < crabs.length; i++) {
		fuel += Math.abs(crabs[i] - position);
	}
	return fuel;
}

function countExponetialFuel(position, crabs) {
	let fuel = 0;
	for (let i = 0; i < crabs.length; i++) {
		let distance = Math.abs(crabs[i] - position);
		for (let j = 0; j <= distance; j++) {
			fuel += j;
		}
	}
	return fuel;
}

function task(lines) {
	let allCrabs = lines[0].split(',');
	let crabs = new Array();
	let low = parseInt(allCrabs[0]);
	let high = low;
	for (let i = 0; i < allCrabs.length; i++) {
		let position = parseInt(allCrabs[i]);
		crabs.push(position);
		low = Math.min(low, position);
		high = Math.max(high, position);
	}
	crabs.sort(function(a, b) {
	  return a - b;
	});
	let lowestFuel = countFuel(crabs[0], crabs);
	for (let i = low; i < high; i++) {
		let fuelHere = countFuel(i, crabs);
		lowestFuel = Math.min(lowestFuel, fuelHere);
	}
	let lowestFuelExponetial = countExponetialFuel(crabs[0], crabs);
	for (let i = low; i < high; i++) {
		let fuelHere = countExponetialFuel(i, crabs);
		lowestFuelExponetial = Math.min(lowestFuelExponetial, fuelHere);
	}
	let result1 = lowestFuel;
	let result2 = lowestFuelExponetial;
	return new Array(lowestFuel, lowestFuelExponetial);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = result[0];
	document.getElementById("result2").innerHTML = result[1];
}
