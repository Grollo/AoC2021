function task(lines) {
	var horizontal = 0;
	var depth = 0;
	var aim = 0;
	for (var i = 0; i < lines.length; i++) {
		lineParts = lines[i].split(' ');
		var direction = lineParts[0];
		var distance = parseInt(lineParts[1]);
		if (direction == 'forward') {
			horizontal += distance;
			depth += distance * aim;
		} else if (direction == 'down') {
			aim += distance;
		} else {
			aim -= distance;
		}
	}
	return depth * horizontal;
}

function runTask() {
	var input = document.getElementById("taskinput").value;
	var numbers = new Array();
	var allLines = input.split('\n');
	var result = task(allLines);
	document.getElementById("result").innerHTML = result;
}
