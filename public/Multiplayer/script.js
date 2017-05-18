// Initialize Firebase
var config = {
	apiKey: "AIzaSyBQkoOHt825UfbFnDSN76IzWEbQHvffRbQ",
	authDomain: "things-f7808.firebaseapp.com",
	databaseURL: "https://things-f7808.firebaseio.com",
	storageBucket: "things-f7808.appspot.com",
	messagingSenderId: "302493813871"
};
firebase.initializeApp(config);

var roomID;
var name;
// var thing = "Draw a Card";
var response = "";
var host = false;
// var Things = firebase.database().ref("/").child('Things');
var count = 0;
getCount();

// host only 
var usedCards = [];
var responceJSON;
var responseARRAY = [];
var current = 0;
var flag=0;
var numberOfPlayers = 0;
var playerScore = 0;

// Style
function hostButton(){
	document.getElementById("LoginButtons").style.display = "none";
	document.getElementById("host_form").style.display = "block";
	generateRoomID();
	
}

function joinButton(){
	document.getElementById("LoginButtons").style.display = "none";
	document.getElementById("join_form").style.display = "block";
}

function backToMain(){
	document.getElementById("LoginButtons").style.display = "block";
	document.getElementById("host_form").style.display = "none";
	document.getElementById("join_form").style.display = "none";
}

function SelectCard(){
	document.getElementById("responce").style.display = "block";
	document.getElementById("cardButtons").style.display = "none";
	document.getElementById("cardContainer").classList.remove('margin10TopBottom');
	document.getElementById("card").classList.remove('height6em');
	document.getElementById("card").classList.remove('texth1');
	document.getElementById("card").classList.add('textp');
	thingCardSelected();
}


function host_join(){
	
	name = document.forms["host_form"]["name"].value.trim();
	
	if (name == "" | name == " "){
		alert("You must enter your name");
	}else if (! /^[a-zA-Z0-9]+$/.test(name)) {
	    alert("Name can't contain '.' , '$' or '#'"); 
	    // add aphlanumeic a - Z and 0 - 9
	}else{

		document.getElementById("host_form").style.display = "none";
		document.getElementById("gameBoard").style.display = "block";
		document.getElementById("cardButtons").style.display = "block";

		document.getElementById("roomID").innerHTML= "RoomID: " + roomID;

		host = true; 

		syncDBtoDiv(roomID,'thing','card');
		// writeThing(roomID,"Draw A Card");
		DrawCard();
		userInit(roomID,name,host);

		gameStatusFlag(false);

		getPlayers("users");

	}
}

function syncDBtoDiv(roomID,dbNode,divID){
	var dbRef = firebase.database().ref("/GameRooms/"+ roomID + '/card/').child(dbNode);
	dbRef.on('value', snap => document.getElementById(divID).innerText = snap.val());
}


function join_game(){

	roomID = document.forms["join_form"]["roomID"].value.trim().toLowerCase();
	name = document.forms["join_form"]["name"].value.trim();

// if name or room is null or if not alphanumaric dont allow join game
	if (name == "" || name == " " || roomID == "" | roomID == " "){
		alert("You must enter your name and roomID");
	}else if (! /^[a-zA-Z0-9]+$/.test(name)) {
	    alert("Name can't contain '.' , '$' or '#'");
	    // @TODO must be alpghanumiic !!
	}else{
		// if syntax is correct for roomid and name then check if name and roomid exists

		// snapshot of rooms promise
		firebase.database().ref('/GameRooms/').once('value', function(snapshot) {
		}).then(roomSnap =>{
			// then snapshot of users promise
			firebase.database().ref('/GameRooms/' + roomID + '/users/').once('value', function(snapshot){
			}).then(userSnap =>{
				
				// if room exisits move on
				if (roomSnap.hasChild(roomID)){
					// if user exists 
					if (userSnap.hasChild(name)){	
						alert("name invalid");
					// if user does not exists
					}else{
						// join game
						document.getElementById("join_form").style.display = "none";
						document.getElementById("gameBoard").style.display = "block";
						document.getElementById("roomID").innerHTML= "RoomID: " + roomID;
						// document.getElementById("responce").style.display = "block";
						cardSelected();

						host = false;
						syncDBtoDiv(roomID,'thing','card');
						userInit(roomID,name,host);
					}
				// if room does not exists
				}else{
					alert("roomID invalid");
				}
			});	
		});
	}

}

function gameStatusFlag(flag){
	firebase.database().ref("/GameRooms/"+roomID).update({
		started: flag,
	});
}

function submitResponce(){
	answer = document.forms["responce_form"]["ans"].value.trim();
	if (answer == "" | answer == " "){
		alert("you must enter a response");
	}else{
		writeUserSubmit(roomID,name,answer);
		document.getElementById("cardButtons").style.display = "none";
		document.getElementById("responce").style.display = "none";
		if (host){
			document.getElementById("StartGame").style.display = "block";
		}else{
			document.getElementById("message").style.display = "table-cell";
			// watchScore();
			// document.getElementById("scoreFeature").style.display = "block";
		}
	}

	gameStarted();
}

function thingCardSelected(){
	firebase.database().ref("/GameRooms/"+roomID+'/card/').update({
		selected: true,
	});
}


function gameStarted() {
	firebase.database().ref('/GameRooms/' + roomID).on('child_changed', function(snapshot) {
		
		// console.log(snapshot.key == "started" + " // " + snapshot.val());

		if (snapshot.key == "started" && snapshot.val() ){
			document.getElementById("message").style.display = "none";
			// document.getElementById("cardContainer").classList.add('margin10TopBottom');
			// document.getElementById("card").classList.add('height6em');
			// document.getElementById("card").classList.add('texth1');
			// document.getElementById("card").classList.remove('textp');
			watchScore();
			document.getElementById("scoreFeature").style.display = "block";
		}
	});
}

function cardSelected(){
	firebase.database().ref('/GameRooms/' + roomID + '/card/').on('child_added', function(snapshot) {
		if (snapshot.key == "selected"){
			document.getElementById("responce").style.display = "block";
			document.getElementById("cardContainer").classList.remove('margin10TopBottom');
			document.getElementById("card").classList.remove('height6em');
			document.getElementById("card").classList.remove('texth1');
			document.getElementById("card").classList.add('textp');
		}
	});
}


function writeUserSubmit(roomID,name,answer) {
	firebase.database().ref("/GameRooms/"+roomID+"/users/"+name).update({
		submited: true,
		answer: answer,
	});
}

function userInit(roomID,name,host) {
	firebase.database().ref("/GameRooms/"+roomID+"/users/"+name).update({
		host: host,
		submited: false,
		answer: "",
		score: 0,
	});
}

function writeThing(roomID, card) {
	firebase.database().ref('/GameRooms/' + roomID + '/card/').update({
		thingAddedAt: firebase.database.ServerValue.TIMESTAMP,
		thing: card,
	});
}

function updateScore(update){
	playerScore += update;
	// document.getElementById("MyScore").innerText = playerScore;
	firebase.database().ref('/GameRooms/' + roomID + '/users/' + name).update({
		score: playerScore,
	});
}


function getAndshareThing(roomID, cardID){
	return firebase.database().ref('/Things/' + cardID).once('value').then(function(snapshot) {
		writeThing(roomID, snapshot.val());
	});
}

function getCount(){
	firebase.database().ref("/Things/").once("value").then(function(snapshot) {
    	count = snapshot.val().count;
    	count -=2 // account for "NoMoreCards" and count child.
  });
}

function getRandCardID(){
	id = (Math.floor((Math.random() * count)))+1; 
	if (usedCards.length < count){
		if (!usedCards.includes(id)){
			usedCards.push(id);
			return id;
		}else{
			return getRandCardID();
		}
	}
	return "NoMoreCards" ;
}

// new game loading...
function getPlayers(location){
	firebase.database().ref('/GameRooms/' + roomID + '/' + location + '/').on('child_changed', function(snapshot) {
	   // all records after the last continue to invoke this function 
	   var li = snapshot.key;

		var node = document.createElement("LI");
	    var textnode = document.createTextNode(li);
	    node.appendChild(textnode);
	    document.getElementById("playersIN").appendChild(node);
	    numberOfPlayers++;
	});
}



function AllIN(){

	if (numberOfPlayers < 2){
		alert("This is MULTIplayer ... ask some more players to join in !! Your RoomID is " + roomID);
	}else{
		document.getElementById("responce").style.display = "none";
		document.getElementById("StartGame").style.display = "none";
		if (host) {
			document.getElementById("responcelist").style.display = "block";
		}
		getVal();		
	}
}


function getVal(){

	var query = firebase.database().ref("/GameRooms/" + roomID +'/users/').orderByKey();
	return query.once("value").then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      // key will be "ada" the first time and "alan" the second time
	      var key = childSnapshot.key;
	      // childData will be the actual contents of the child
	      responseARRAY.push(childSnapshot.val().answer);  
	  	});

	  	responseARRAY = shuffle(responseARRAY);
	    
	    if (responseARRAY.length == 1){
	    	document.getElementById('thing').innerHTML = responseARRAY[0];
	    }else if (responseARRAY.length > 1){
	    	// document.getElementById("prevThingButton").style.display = "block";
	    	document.getElementById("nextThingButton").style.display = "block";
	    	// document.getElementById("prevThingButton").style.visibility = "hidden";
			printVal(0);
	    }else{
	    	console.log("error: need at least 1 responce");
	    }
	});
}

function printVal(id){

	if(current == 0){
		document.getElementById("nextThingButton").style.visibility = "visible";
	} else if (current < (responseARRAY.length - 1)){
		document.getElementById("nextThingButton").style.visibility = "visible";
		// document.getElementById("prevThingButton").style.visibility = "visible";
	} else if (current == responseARRAY.length -1){
		// document.getElementById("prevThingButton").style.visibility = "visible";
		document.getElementById("nextThingButton").style.visibility = "hidden";
	}else{
		// document.getElementById("prevThingButton").style.visibility = "visible";
	}

	document.getElementById('thing').innerHTML = responseARRAY[id];
	document.getElementById('cardCount').innerHTML = current + 1 + '/' + responseARRAY.length;
}

function prevThing(){
	current -= 1;
	if (current == 0){
		document.getElementById("nextThingButton").style.visibility = "visible";
		document.getElementById("prevThingButton").style.visibility = "hidden";

	}
	printVal(current);
}
var readAgainFlag = true;

function nextThing(){
	current += 1;
	if(current == responseARRAY.length -1){
		document.getElementById("nextThingButton").style.visibility = "hidden";
		// document.getElementById("prevThingButton").style.visibility = "visible";
		if(readAgainFlag){
			document.getElementById("readAgain").style.display = "block";
			readAgainFlag = false;
		}else{
			document.getElementById("readAgain").style.display = "none";
			document.getElementById("start").style.display = "block";
		}
	}
	printVal(current);
}
function readAgain() {
	document.getElementById("readAgain").style.display = "none";
	current = 0;
	printVal(0);
}

function startgame(){
	document.getElementById("responcelist").style.display = "none";
	// document.getElementById("message").style.display = "table-cell";
	gameStatusFlag(true);
	// watchScore();

	// document.getElementById("scoreFeature").style.display = "block";

}


// window.onunload = function(){

// 	if (!host){
// 		firebase.database().ref('/GameRooms/' + roomID + '/users/' + name).remove();
// 	}
// 	else{
// 		firebase.database().ref('/GameRooms/' + roomID).remove();
// 	}
// }



// document.getElementById("card").innerHTML = "Draw a card";
// document.getElementById("remaining").innerHTML = "" + cards.length + " Cards Left";
function DrawCard() {
    
	if (!host){
		return 0;
	}

    var id = getRandCardID(); // get rand card from cards list

	getAndshareThing(roomID, id);
}


function generateRoomID() {
	id = (Math.floor((Math.random() * 2404)))+1;

	return firebase.database().ref('/Words/' + id).once('value').then(function(snapshot) {
		checkIfRoomExists(snapshot.val());
	});
}

function checkIfRoomExists(ID) {
	firebase.database().ref('/GameRooms/').once('value', function(snapshot) {
	    if (snapshot.hasChild(ID)){
	    	generateRoomID();
	    }else{
	    	roomID = ID;
	    }
  });
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//modify other code to remove repeat
function syncDBtoScore(user_name,divID){
	var dbRef = firebase.database().ref("/GameRooms/"+ roomID + '/users/' + user_name ).child('score');
	dbRef.on('value', snap => document.getElementById(divID).innerText = snap.val());
}


function addItem(user_name, user_score) {
    var table = document.getElementById("myTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = user_name;
    cell2.innerHTML = user_score;
    cell2.setAttribute("id", "score_" + user_name);
}

function watchScore(){

	var query = firebase.database().ref("/GameRooms/" + roomID +'/users/').orderByKey();
	return query.once("value").then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      // key will be "ada" the first time and "alan" the second time
	      var user_name = childSnapshot.key;
	      // childData will be the actual contents of the child
	      var user_score = childSnapshot.val().score; 

	      addItem(user_name, user_score);
	      syncDBtoScore(user_name, "score_" + user_name);
	  	});
		// what ever after
	});
}