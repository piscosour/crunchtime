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
	this.burnrate = 20;
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

// mechanic text description
var mechanicTextsEn = [
	{
		"title": "Work on your prototype",
		"description": "It's all about making games. So make sure you put in some time to finishing your prototype!"
	},
	{
		"title": "Hire a new team member",
		"description": "Expanding your team can help you finish your prototype faster, but you need to make sure you can afford it."
	},
	{
		"title": "Look for client work",
		"description": "Working on client projects can help you raise some cash, but it will force you to turn your efforts away from your protoype."
	},
	{
		"title": "Test game with players",
		"description": "Doing some playtesting can speed up your development process, but it will cost you some money to put it together."
	},
	{
		"title": "Take a day off",
		"description": "Make sure your team doesn't burn out - take a break every once in a while before stress levels get out of control."
	},
	{
		"title": "Pitch a game to investors",
		"description": "You prototype is ready to show around to investors - a cash injection will guarantee your studio's survival in the future."
	},
	{
		"title": "Present game at a developer conference",
		"description": "Ready to show your game to the world? Showing it at a conference will increase your chances of landing an investor."
	},
	{
		"title": "Publish game",
		"description": "Your prototype is complete! You're now ready to publish your game."
	}
]

// assign texts based on lang select - not comprehensive, but sets the base
function setLanguage(lang) {
	if (lang == "en") {
		var mechanicTexts = mechanicTextsEn;
	}
	else if (lang =="es") {
		var mechanicTexts = mechanicTextsEs;
	}
}

// in the meantime...
mechanicTexts = mechanicTextsEn;

// render player actions
function renderMechanics() {
	var mechanicsBlock = document.getElementById("mechanicsBlock");

	// clear any previous HTML
	mechanicsBlock.innerHTML = "";

	// to do: move all mechanics to a JSON File
	var tr = document.createElement("tr");
	var td = tr.appendChild(document.createElement("td"));
	var td2 = tr.appendChild(document.createElement("td"));
	td.innerHTML = '<h3>' + mechanicTexts[0].title + '</h3>' + '<p>' + mechanicTexts[0].description + '</p>';
	td2.innerHTML = '<button class="btn btn-large btn-info" onclick="mechanicsDevelop()">Crunch!</button>';
	mechanicsBlock.appendChild(tr);

	var tr = document.createElement("tr");
	var td = tr.appendChild(document.createElement("td"));
	var td2 = tr.appendChild(document.createElement("td"));
	td.innerHTML = '<h3>' + mechanicTexts[1].title + '</h3>' + '<p>' + mechanicTexts[1].description + '</p>';
	td2.innerHTML = '<button class="btn btn-large btn-info" onclick="mechanicsHire()">Crunch!</button>';
	mechanicsBlock.appendChild(tr);

	var tr = document.createElement("tr");
	var td = tr.appendChild(document.createElement("td"));
	var td2 = tr.appendChild(document.createElement("td"));
	td.innerHTML = '<h3>' + mechanicTexts[2].title + '</h3>' + '<p>' + mechanicTexts[2].description + '</p>';
	td2.innerHTML = '<button class="btn btn-large btn-info" onclick="mechanicsClient()">Crunch!</button>';
	mechanicsBlock.appendChild(tr);

	var tr = document.createElement("tr");
	var td = tr.appendChild(document.createElement("td"));
	var td2 = tr.appendChild(document.createElement("td"));
	td.innerHTML = '<h3>' + mechanicTexts[3].title + '</h3>' + '<p>' + mechanicTexts[3].description + '</p>';
	td2.innerHTML = '<button class="btn btn-large btn-info" onclick="mechanicsTesting()">Crunch!</button>';
	mechanicsBlock.appendChild(tr);

	var tr = document.createElement("tr");
	var td = tr.appendChild(document.createElement("td"));
	var td2 = tr.appendChild(document.createElement("td"));
	td.innerHTML = '<h3>' + mechanicTexts[4].title + '</h3>' + '<p>' + mechanicTexts[4].description + '</p>';
	td2.innerHTML = '<button class="btn btn-large btn-info" onclick="mechanicsBreak()">Crunch!</button>';
	mechanicsBlock.appendChild(tr);

	if (player.completion >= 75) {
		var tr = document.createElement("tr");
		var td = tr.appendChild(document.createElement("td"));
		var td2 = tr.appendChild(document.createElement("td"));
		td.innerHTML = '<h3>' + mechanicTexts[5].title + '</h3>' + '<p>' + mechanicTexts[5].description + '</p>';
		td2.innerHTML = '<button class="btn btn-large btn-info" onclick="mechanicsPitch()">Crunch!</button>';
		mechanicsBlock.appendChild(tr);
	}

	if (player.completion >= 85) {
		var tr = document.createElement("tr");
		var td = tr.appendChild(document.createElement("td"));
		var td2 = tr.appendChild(document.createElement("td"));
		td.innerHTML = '<h3>' + mechanicTexts[6].title + '</h3>' + '<p>' + mechanicTexts[6].description + '</p>';
		td2.innerHTML = '<button class="btn btn-large btn-info" onclick="mechanicsConference()">Crunch!</button>';
		mechanicsBlock.appendChild(tr);
	}

	if (player.completion >= 100) {
		var tr = document.createElement("tr");
		var td = tr.appendChild(document.createElement("td"));
		var td2 = tr.appendChild(document.createElement("td"));
		td.innerHTML = '<h3>' + mechanicTexts[7].title + '</h3>' + '<p>' + mechanicTexts[7].description + '</p>';
		td2.innerHTML = '<button class="btn btn-large btn-info" onclick="mechanicsGame()">Crunch!</button>';
		mechanicsBlock.appendChild(tr);
	}
}

// Turn mechanic
function nextTurn() {
	checkGameState();
	player.ttl = player.ttl - 1;
	updatePlayerStats();
	renderMechanics(); // some mechanics display conditionally based on player stats, so we refresh every turn
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
	renderMechanics();
}
