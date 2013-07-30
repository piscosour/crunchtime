// ------- //
// PeruDev //
// ------- //

// ------------- //
// Initial Setup //
// ------------- //

// Player class

function PlayerClass(name) {
	this.name = name;
	this.ttl = 60;
	this.completion = 50;
	this.capacity = 3;
	this.cash = 1000;
	this.investor = 0;
	this.luck = 20;
	this.stress = 50;
}

var playerName = window.prompt("Enter player name");
var player = new PlayerClass(playerName);

// ----------------- //
// Environment setup //
// ----------------- //

// update player stats display
function updatePlayerStats() {
	document.getElementById("playerNameBox").innerHTML = player.name;
	document.getElementById("ttlBox").innerHTML = player.ttl + "days";
	document.getElementById("completionBox").innerHTML = player.completion + "%";
	document.getElementById("cashBox").innerHTML = "$" + player.cash;
}

// Turn mechanic
function nextTurn() {
	checkGameState();
	player.ttl = player.ttl - 1;
	updatePlayerStats();
}

// Win / Lose conditions
function checkGameState() {
	if (player.ttl == 0) {
		endGame("lose");
	}
	else if (player.cash <= 0) {
		endGame("lose");
	}
	else if (player.completion == 100) {
		endGame("win");
	}
	else if (player.investor == 1) {
		endGame("win");
	}

}

function endGame(status) {
	if (status == "lose") {
		window.alert("You lose!")
	}
	else if (status == "win") {
		window.alert("You win!")
	}
}


// -------------- //
// Player actions //
// -------------- //

// work on game

function mechanicsDevelop() {
	player.completion = player.completion + Math.floor((Math.random()*player.capacity)+1);
	nextTurn();
}

// recruit talent
function mechanicsHire() {
	player.skill = player.skill + 2;
	nextTurn();
}

// find client work
function mechanicsClient() {
	nextTurn();
}

// pitch to investor (available when prototype hits 75%)
function mechanicsPitch() {
	nextTurn();
}

// go to conference (available at 85%)
function mechanicsConference() {
	nextTurn();
}

// playtesting
function mechanicsTesting() {
	player.cash = player.cash - 100;
	player.completion = player.completion * 1.05;
	nextTurn();
}

// publish game (available at 100%)
function mechanicsPublish() {
	nextTurn();
}

// take a day off
function mechanicsBreak() {
	player.stress = player.stress * 0.85;
	nextTurn();
}


// ------------- //
// Random events //
// ------------- //

// lose a co-founder (must hire)
function eventsSplit() {

}

// founder borrows money (reduces cash, increases stress)
function eventsLoan() {

}

// founder evicted (increases stress, reduces time)
function eventsEviction() {

}

// unexpected tax bill
function eventsTaxes() {

}

// code sprint (increases completion)
function eventsSprint() {

}


// ------------ //
// Main section //
// ------------ //

window.onload = function () {
	updatePlayerStats();
}
