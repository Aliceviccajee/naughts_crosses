// assiging variables to the data needed for the logic
const xClass = 'x'
const oClass = 'o'
// selecting all cells in the game
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
// allowing us to select the text value for winning message
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const resetButton = document.getElementById('resetButton')
// setting the initial state of the players to always start with x's turn
let oTurn = false
// array defining all the possible combinations for a player to win
const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

//adding click events to all cells, allowing them to only be clicked once
cellElements.forEach(cell => {
  cell.addEventListener("click", handleClick, { once: true })
});

// setting up all the functions needed for a game to work //

// place mark assigns the current players class to the clicked cell, marking either a 'o'
// or 'x'
function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

// setting the oTurn to it's opposite, which creates a toggle between players turns
function swapTurns() {
	oTurn = !oTurn
}

// function to detect when a game has ended by calling the draw function, 
// turnary statement to see if a player has won
// setting the winning text message to the outcome of the game
function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = `Draw!`
	} else {
		winningMessageTextElement.innerText = `${oTurn ? "Naughts" : "Crosses"} Win!`
	}
	winningMessageTextElement.classList.add('show')
	winningMessageTextElement.classList.remove('hide')
}

// function to check if an index in the winning combination array contains all the same 
// class, if so that class is the winner
function checkWin(currentClass) {
	return winningCombinations.some(combination => { 
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}

// using destructuring to return all cell elements as an array
// checking to see if all cells have been assigned a class, and if the winner function
// hasn't been called then it is a draw
function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(xClass) || 
		cell.classList.contains(oClass)
	})
}

// adding a click event to the reset button, that takes a click and start game function
// as arguments. Calls the start game function which strips all classes 
// and resets the state of the board
resetButton.addEventListener('click', startGame)

// start game function clearing the board of all classes and removing winning message
// reassiging the click events to the cells and again only allowing them to be clicked 
// once. Removing the winning message
function startGame() {
	cellElements.forEach(cell => {
		cell.addEventListener('click', handleClick, { once: true})
		cell.classList.remove(xClass)
		cell.classList.remove(oClass)
	})
	winningMessageTextElement.classList.remove('show')
	winningMessageTextElement.classList.add('hide')
}

// function calling all the functions to create the game, 
// setting the event target to the cells, checking for a win or draw, else swap turns
function handleClick(e) {
	const cell = e.target
	const currentClass = oTurn ? oClass : xClass 
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
	}
}
