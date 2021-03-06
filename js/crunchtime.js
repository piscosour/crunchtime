// ---------- //
// CrunchTime //
// ---------- //

// ------------- //
// Initial Setup //
// ------------- //

// Player class

function PlayerClass(name) {
	this.name = name;
	this.cash = 1000;
	this.burnrate = 25;
	this.ttl = this.cash / this.burnrate;
	this.completion = 25;
	this.capacity = 2;
	this.investor = 0;
	this.luck = 20;
	this.stress = 50;
	this.stressRate = 1;

	this.client = false;

	this.newClient = newClient;
	function newClient() {
		this.client = true;
		this.clientProject = 0;
	}

	this.updateClientProject = updateClientProject;
	function updateClientProject() {
		this.clientProject = this.clientProject + Math.floor((Math.random()*player.capacity)+1);
		nextTurn();
	}
}

var playerName = window.prompt("Enter player name");
var player = new PlayerClass(playerName);

// ----------------- //
// Environment setup //
// ----------------- //

// update player stats
function updatePlayerStats() {
	player.cash = player.cash - player.burnrate;
	player.ttl = player.cash / player.burnrate;
	player.stress = player.stress + player.stressRate;
}

// update player stats display
function renderPlayerStats() {
	document.getElementById("playerNameBox").innerHTML = player.name;
	document.getElementById("ttlBox").innerHTML = player.ttl + "days";
	if (player.client == false) {
		document.getElementById("completionBox").innerHTML = player.completion + "%";
	}
	if (player.client == true) {
		document.getElementById("completionBox").innerHTML = player.clientProject + "%";
	}
	document.getElementById("cashBox").innerHTML = "$" + player.cash;
	document.getElementById("burnrateBox").innerHTML = "$" + player.burnrate;
	document.getElementById("stressBox").innerHTML = player.stress + "%";
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
	},
	{
		"title": "Work on client project",
		"description": "You got a client! Now you have to deliver their project..."
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
	if (player.client == false) {
		var tr = document.createElement("tr");
		var td = tr.appendChild(document.createElement("td"));
		var td2 = tr.appendChild(document.createElement("td"));
		td.innerHTML = '<h3>' + mechanicTexts[0].title + '</h3>' + '<p>' + mechanicTexts[0].description + '</p>';
		td2.innerHTML = '<button class="btn btn-large btn-info" onclick="mechanicsDevelop()">Crunch!</button>';
		mechanicsBlock.appendChild(tr);
	}

	var tr = document.createElement("tr");
	var td = tr.appendChild(document.createElement("td"));
	var td2 = tr.appendChild(document.createElement("td"));
	td.innerHTML = '<h3>' + mechanicTexts[1].title + '</h3>' + '<p>' + mechanicTexts[1].description + '</p>';
	td2.innerHTML = '<button class="btn btn-large btn-info" onclick="mechanicsHire()">Crunch!</button>';
	mechanicsBlock.appendChild(tr);

	if (player.client == false) {
		var tr = document.createElement("tr");
		var td = tr.appendChild(document.createElement("td"));
		var td2 = tr.appendChild(document.createElement("td"));
		td.innerHTML = '<h3>' + mechanicTexts[2].title + '</h3>' + '<p>' + mechanicTexts[2].description + '</p>';
		td2.innerHTML = '<button class="btn btn-large btn-info" onclick="mechanicsClient()">Crunch!</button>';
		mechanicsBlock.appendChild(tr);
	}

	if (player.client == true) {
		var tr = document.createElement("tr");
		var td = tr.appendChild(document.createElement("td"));
		var td2 = tr.appendChild(document.createElement("td"));
		td.innerHTML = '<h3>' + mechanicTexts[8].title + '</h3>' + '<p>' + mechanicTexts[8].description + '</p>';
		td2.innerHTML = '<button class="btn btn-large btn-info" onclick="player.updateClientProject()">Crunch!</button>';
		mechanicsBlock.appendChild(tr);	
	}

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

// roll dice for random events
function rollDice() {
	roll = Math.floor((Math.random()*10)+1);
	if (roll == 10) {
		eventsSplit();
	}
	else if (roll == 20) {
		eventsLoan();
	}
	else if (roll == 30) {
		eventsEviction();
	}
	else if (roll == 40) {
		eventsTaxes();
	}
	else if (roll == 50) {
		eventsSprint();
	}
}

// Turn mechanic
function nextTurn() {
	checkGameState();
	// rollDice();
	updatePlayerStats();
	if (player.stress == 100) {
		eventsSplit();
	}
	if (player.client == true) {
		if (player.clientProject >= 100) {
			window.alert("Congratulations! You finished your client project. Maybe now you can get back to your game...");
			player.client = false;
		}
	}
	renderPlayerStats();
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
	else if (player.completion >= 100) {
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
	player.skill = player.skill * 2;
	player.cash = player.cash - 400;
	nextTurn();
}

// find client work
function mechanicsClient() {
	player.newClient();
	player.cash = player.cash + 2000;
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
	window.alert("Your partner quit. Unless you hire someone new, your development capacity is reduced in half.");
	player.capacity = player.capacity / 2;
}

// founder borrows money (reduces cash, increases stress)
function eventsLoan() {
	window.alert("Your partner needs to borrow money from the company because of an emergency. You're not happy about this.");
	player.cash = player.cash - 10;
	player.stress = player.stress + 20;
	player.stressRate = player.stressRate + 1;
}

// founder evicted (increases stress, reduces time)
function eventsEviction() {
	window.alert("Your partner couldn't make rent and has to move in with you. You now see each other all day. And you had to help him move his stuff.");
	player.ttl = player.ttl - 3;
	player.stress = player.stress + 20;
	player.stressRate = player.stressRate + 1;
}

// unexpected tax bill
function eventsTaxes() {
	window.alert("You forgot to pay your taxes. You just got hit with a fine for failing to pay on time.");
	player.cash = player.cash - 200;
	player.stress = player.stress + 10;
}

// code sprint (increases completion)
function eventsSprint() {
	window.alert("You spent all night coding and managed to get ahead on the to do list. Coffee FTW.");
	player.completion = player.completion + 10;
	player.stress = player.stress + 10;
}


// ------------ //
// Main section //
// ------------ //

window.onload = function () {
	renderPlayerStats();
	renderMechanics();
}
