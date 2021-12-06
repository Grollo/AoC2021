function simulateDay(oldPopulation) {
	let newPopulation = oldPopulation.splice(1, 8);
	newPopulation[6] += oldPopulation[0];
	newPopulation.push(oldPopulation[0]);
	return newPopulation;
}

function simXDays(days, population) {
	for (let i = 0; i < days; i++) {
		population = simulateDay(population);
	}
	let popCount = 0;
	for (let i = 0; i < population.length; i++) {
		popCount += population[i];
	}
	return popCount;
}

function task(lines) {
	let allFish = lines[0].split(',');
	let population = new Array(9).fill(0);
	for (let i = 0; i < allFish.length; i++) {
		population[parseInt(allFish[i])]++;
	}
	return simXDays(256, population);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = task(allLines);
}
