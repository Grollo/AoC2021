function getEmptyMark(cardSize) {
	let emptyCard = new Array();
	for (let i = 0; i < cardSize; i++) {
		let emptyRow = new Array();
		for (let j = 0; j < cardSize; j++) {
			emptyRow.push(false);
		}
		emptyCard.push(emptyRow);
	}
	return emptyCard;
}

function task(lines) {
	let cardSize = 5;
	let drawOrder = lines[0].split(',');
	let bingoNumbers = new Array();
	let markedCards = new Array();
	let currentCard = new Array();
	for (let i = 2; i < lines.length; i++) {
		if (!lines[i]) {
			bingoNumbers.push(currentCard);
			markedCards.push(getEmptyMark(cardSize));
			currentCard = new Array();
		} else {
			let newLine = lines[i].split(/\s+/);
			for (let j = 0; j < newLine.length; j++) {
				if (!newLine[j]) {
					newLine.splice(j, 1);
					j--;
				}
			}
			currentCard.push(newLine);
		}
	}
	let finished = false;
	let winningScore = 0;
	let losingScore = 0;
	let winningBoards = new Array();
	for (let i = 0; i < drawOrder.length; i++) {
		let drawnNumber = drawOrder[i];
		for (let card = 0; card < bingoNumbers.length; card++) {
			if (!winningBoards.includes(card)) {
				for (let row = 0; row < cardSize; row++) {
					for (let column = 0; column < cardSize; column++) {
						if (bingoNumbers[card][row][column] == drawnNumber) {
							markedCards[card][row][column] = true;
							let rowCheck = true;
							let columnCheck = true;
							for (let j = 0; j < cardSize; j++) {
								rowCheck &= markedCards[card][j][column];
								columnCheck &= markedCards[card][row][j];
							}
							if (rowCheck || columnCheck) {
								let score = 0;
								for (let scoringRow = 0; scoringRow < cardSize; scoringRow++) {
									for (let scoringColumn = 0; scoringColumn < cardSize; scoringColumn++) {
										if (!markedCards[card][scoringRow][scoringColumn]) {
											score += parseInt(bingoNumbers[card][scoringRow][scoringColumn]);
										}
									}
								}
								score *= parseInt(drawnNumber);
								winningBoards.push(card);
								if (winningBoards.length == 1) {
									winningScore = score;
								} else if (winningBoards.length == bingoNumbers.length) {
									losingScore = score;
									finished = true;
								}
							}
						}
					}
				}
			}
		}
		if (finished) {
			break;
		}
	}
	let result1 = winningScore;
	let result2 = losingScore;
	return new Array(result1, result2);
}

function runTask() {
	let input = document.getElementById("taskinput").value;
	let allLines = input.split('\n');
	let result = task(allLines);
	document.getElementById("result1").innerHTML = result[0];
	document.getElementById("result2").innerHTML = result[1];
}
