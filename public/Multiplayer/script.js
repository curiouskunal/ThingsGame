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
var host = 0;
// var Things = firebase.database().ref("/").child('Things');
var count = 0;
getCount();

// host only 
var usedCards = [];
var responceJSON;
var responseARRAY = [];
var flag=0;

// Style
function hostButton(){
	document.getElementById("LoginButtons").style.display = "none";
	document.getElementById("host_form").style.display = "block";
	
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
	if (host){
		document.getElementById("StartGame").style.display = "block";
	}

}


function host_join(){
	
	document.getElementById("host_form").style.display = "none";
	document.getElementById("gameBoard").style.display = "block";
	document.getElementById("cardButtons").style.display = "block";
	
	name = document.forms["host_form"]["name"].value;
	roomID = "room3"; // make rand word gen\

	// if name is null 

	// hide host form

	host = 1; 

	syncDBtoDiv(roomID,'thing','card');
	writeThing(roomID,"Draw A Card");
	writeUserSubmit(roomID, name, response);
	// console.log(count);
}

function syncDBtoDiv(roomID,dbNode,divID){
	var dbRef = firebase.database().ref("/"+ roomID).child(dbNode);
	dbRef.on('value', snap => document.getElementById(divID).innerText = snap.val());
}


function join_game(){

	document.getElementById("join_form").style.display = "none";
	document.getElementById("gameBoard").style.display = "block";

	roomID = document.forms["join_form"]["roomID"].value;
	name = document.forms["join_form"]["name"].value;
	// if name or room is null retry
	// if room already exists retry

	// hide join form 

	host = 0;
	syncDBtoDiv(roomID,'thing','card');
	writeUserSubmit(roomID, name, response);
}

function submitResponce(){
	answer = document.forms["responce_form"]["ans"].value;
	writeUserSubmit(roomID,name,answer);
}


function writeUserSubmit(roomID,name,answer) {
	firebase.database().ref("/"+roomID+"/users/"+name).update({
		answer: answer,
	});
}

function writeThing(roomID, card) {
	firebase.database().ref('/' + roomID).update({
		thing: card,
	});
}


function getAndshareThing(roomID, cardID){
	return firebase.database().ref('/Things/' + cardID).once('value').then(function(snapshot) {
		writeThing(roomID, snapshot.val());
	});
}

function getCount(){
	firebase.database().ref().once("value").then(function(snapshot) {
    	count = snapshot.child("/Things").numChildren();
    	count -=1 // account for "NoMoreCards" child.
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



function AllIN(){
	document.getElementById("responce").style.display = "none";
	document.getElementById("StartGame").style.display = "none";
	
	if (host) {
		document.getElementById("responcelist").style.display = "block";
	}
	
	getVal();

}


function getVal(){

	var query = firebase.database().ref(roomID+'/users/').orderByKey();
	return query.once("value").then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      // key will be "ada" the first time and "alan" the second time
	      var key = childSnapshot.key;
	      // childData will be the actual contents of the child
	      responseARRAY.push(childSnapshot.val().answer);  
	  	});
	    
	    printVal();
	});
}

function printVal(){

	for (var i=0; i<responseARRAY.length; i++){

		console.log(responseARRAY[i]);

		var li = responseARRAY[i];

		var node = document.createElement("LI");
	    var textnode = document.createTextNode(li);
	    node.appendChild(textnode);
	    document.getElementById("thing").appendChild(node);
	}

	responseARRAY = [];
}



window.onunload = function(){

	if (!host){
		firebase.database().ref('/' + roomID + '/users/' + name).remove();
	}
	else{
		firebase.database().ref('/' + roomID).remove();
	}
}



// document.getElementById("card").innerHTML = "Draw a card";
// document.getElementById("remaining").innerHTML = "" + cards.length + " Cards Left";
function myFunction() {
    
	if (!host){
		return 0;
	}

    var id = getRandCardID(); // get rand card from cards list

	getAndshareThing(roomID, id);
}

