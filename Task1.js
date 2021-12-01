function task(numbers) {
	var result = 0;
	var previous = numbers[0] + numbers[1] + numbers[2];
	for (var i = 3; i < numbers.length; i++) {
		var newsum = numbers[i] + numbers[i-1] + numbers[i-2];
		if (newsum > previous) {
			result++;
		}
		previous = newsum;
	}
	return result;
}

function runTask() {
	var input = document.getElementById("taskinput").value;
	var numbers = new Array();
	var allLines = input.split('\n');
	allLines.forEach((line) => {
		numbers.push(parseInt(line));
	});
	var result = task(numbers);
	document.getElementById("result").innerHTML = result;
}
