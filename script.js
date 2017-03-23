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
var responseARRAY = [];


function host_join(){
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


// function getThing(num){
// 	return firebase.database().ref('/Things/' + num).once('value').then(function(snapshot) {
// 		thing =  snapshot.val();
// 	});
// }



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


// function getNextMove(returnVal){
// 	return (returnVal);
// }
// function getMyUserData(userId) {
// 	getData(userId,getNextMove);
// }
// function getData(userId,next){

// 	firebase.database().ref('Things/' + userId).once('value').then(function(snapshot) {
// 		var exists = (snapshot.val() !== null);
// 		if (exists){
// 			next(snapshot.val());
// 		}else{
// 			next("ERROR");
// 		}
// 	});
// }


// var ref = firebase.database().ref(roomID+"/" + test);
// firebase.database().ref(roomID+"/" + test).once("value")
//   .then(function(snapshot) {
//     snapshot.child("answer").val(); // {first:"Ada",last:"Lovelace"}

//   });


function AllIN(){

	getALLREPLYS();


	console.log(responseARRAY);



	// for (var i; i < responseARRAY.length; i++){
	// 	document.getElementById('responcelist').innerHTML =
	// 	'<li>' +
	// 	responseARRAY[i]
	// 	+ '</li>';
	// }

	// console.log(responseARRAY)
}

var flag = 0;

function getALLREPLYS(){
	firebase.database().ref(roomID+"/users/").orderByKey().once("value").then(function(snapshotparent) {
		snapshotparent.forEach(function(childSnapshot) {

			var user = childSnapshot.key;
			 console.log(childSnapshot.key);

			firebase.database().ref(roomID+"/users/" + user).once("value").then(function(snapshotchild) {
				responseARRAY.push(snapshotchild.val().answer);
			});
		});
	});
}



/*
var cards = [

	"Things cannibals think about while dinning",
	"Things dogs are actually saying when they bark",
	"Things grown-ups wish they could still do.",
	"Things you should never put in your mouth",
	"Things not to do in a hospital",
	"Things not to do while driving!!",
	"Things not to tell your mother",
	"Things paramedics shouldn't say to a patient on the way to the hospital",
	"Things people do when no one is looking",
	"Things that are good!",
	"Things that are harder than they look",
	"Things that are your favorite foods!!",
	"Things that you can use for transport (car, bike, bus, plane etc)",
	"Things that confirm your house is haunted!",
	"Things that confirm your life is going downhill",
	"Things that go bad",
	"Things that happen in Vegas that should stay in Vegas!!",
	"Things that jiggle",
	"Things that make sex fun!!!",
	"Things that make you feel stupid!",
	"Things that make you giggle!!!",
	"Things that make you uncomfortable",
	"Things that must be magic.",
	"Things that shouldn't be made into video games!!!",
	"Things that shouldn't be passed from one generation to the next",
	"Things that smell terrible",
	"Things that squirt",
	"Things that you will find in (name room of house..bathroom, kitchen, etc)",
	"Things that you can trip over",
	"Things that you love to watch on TV!",
	"Things that you shouldn't do in public.",
	"Things that you shouldn't swallow.",
	"Things that you shouldn't throw off of a building.",
	"Things that your parents would kill you for.",
	"Things that would be fun to do in an elevator",
	"Things that would keep you out of heaven",
	"Things to wear to (occasion ...wedding, funeral, etc)",
	"Things you wouldn't want to be allergic to",
	"Things you can never find",
	"Things you do to get a job!",
	"Things you do to relieve stress!",
	"Things you do to stay warm!!!",
	"Things you don't want to find in your bed",
	"Things you might find in a library",
	"Things you name home brewed beer!",
	"Things you return from your Christmas gifts...",
	"Things you shop for on black Friday!",
	"Things you should be thankful for!!",
	"Things you should do to get ready for winter!!!",
	"Things you should give as birthday gifts!",
	"Things you should never put in your mouth.",
	"Things you shouldn't attempt to juggle",
	"Things you shouldn't celebrate on your birthday!",
	"Things you shouldn't do babysitting!!",
	"Things you shouldn't do in public!",
	"Things you shouldn't do on your birthday!!",
	"Things you shouldn't do when naked",
	"Things you shouldn't do with glue",
	"Things you shouldn't give trick-or-treaters!!!",
	"Things you shouldn't lick",
	"Things you shouldn't play catch with.",
	"Things you shouldn't say to your in-laws",
	"Things you shouldn't say when trying to make a good impression",
	"Things you shouldn't say when walking out of the bathroom!!",
	"Things you shouldn't send your friends in a pic!!!",
	"Things you shouldn't swallow",
	"Things you shouldn't throw off a building",
	"Things you shouldn't tie to the roof of your car",
	"Things you shouldn't wear to a wedding/ funeral",
	"Things you shouldn't carve into a pumpkin!!",
	"Things you use to remove snow from your car!",
	"Things you wish for!",
	"Things you wish were included in a divorce settlement!",
	"Things you would ask a psychic",
	"Things you would buy if you were rich!!!",
	"Things you would do if you were a giant",
	"Things you would rather forget",
	"Things you would rather put off till tomorrow!!",
	"Things you would wish for if you were stranded on an island!!",
	"Things you wouldn't do for a million dollars",
	"Things you wouldn't want made into a movie!",
	"Things you wouldn't want to do in cemetery",
	"Things you'd rather forget!",
	"Things your friends text you!!",
	"Things your parents forgot to tell you",
	"Things your parents would kill you for",
	"Things you shouldn't throw off a building!",
	"Things you'll do when you retire",
	"Things that would get a doctor sued for malpractice",
	"Things you shouldn't do in front of a crowd",
	"Things that give you a headache",
	"Things you wouldn't want to clean",
	"Things children shouldn't know",
	"Things a gentleman shouldn't do",
	"Things women know more about than men",
	"Things you shouldn't give as a gift",
	"Things that make you go ahhhh",
	"Things you shouldn't do at the dinner table",
	"Things you would consider strange to include on a resume",
	"Things there should be an award for",
	"Things people do when no one is looking",
	"Things you shouldn't do when having dinner with the Queen",
	"Things you shouldn't make fun of",
	"Things that make you giggle",
	"Things you shouldn't teach your pets to do",
	"Things you shouldn't photograph",
	"Things you shouldn't do in the office",
	"Things that make ballet more exciting",
	"Things men know more about then women",
	"Things you would say to a pig if it could talk",
	"Things you can do to get rid of unwanted guests",
	"Things you notice about yourself as you get older",
	"Things you shouldn't say to your husband",
	"Things you would line up to see",
	"Things you shouldn't pay any attention to",
	"Things a chicken thinks about when the farmer picks up the eggs",
	"Things that make a good punch line",
	"Things you wish grew on trees",
	"Things you shouldn't say to you dentist",
	"Things that confirm you are guilty",
	"Things that tire you out",
	"Things that confirm your house is haunted",
	"Things you wish you could borrow from a library",
	"Things you shouldn't do while writing a final exam",
	"Things you shouldn't teach your parrot to say",
	"Things that go bad",
	"Things that shouldn't go into a time capsule",
	"Things that hurt your back",
	"Things you shouldn't mix",
	"Things you just cant believe",
	"Things that are politically incorrect",
	"Things that happen once in a blue moon",
	"Things about women that frustrate you",
	"Things that are harder than they look",
	"Things kids know more about than adults",
	"Things that cause trouble",
	"Things that make you relax",
	"Things you wouldn't want to be allergic to",
	"Things you shouldn't shout at the top of your lungs",
	"Things you need to survive",
	"Things you shouldn't do in a car",
	"Things you would like to play with",
	"Things you can't stop",
	"Things you shouldn't do on vacation",
	"Things you would wish for if you found a genie in a bottle",
	"Things that seem to take an eternity",
	"Things that confirm you are losing your memory",
	"Things you shouldn't display in your china cabinet",
	"Things you would like as your last words",
	"Things that shouldn't be passed from one generation to the next",
	"Things firemen do between fires",
	"Things you shouldn't put off until tomorrow",
	"Things that shouldn't be lumpy",
	"Things fish think about as they swim in their aquarium",
	"Things that confirm that your life is going downhill",
	"Things you could use as an excuse on judgment day",
	"Things that would make golf more exciting",
	"Things you shouldn't advertise in the classified ads",
	"Things you shouldn't do in the house",
	"Things that would make work more exciting",
	"Things that are wild",
	"Things that require an assistant",
	"Things you would like to say to the President",
	"Things you would like to ask a psychic",
	"Things you shouldn't encourage your children to do",
	"Things you wish you could do with your feet",
	"Things you never see on television",
	"Things you wish worked by remote control",
	"Things you shouldn't exaggerate",
	"Things a waiter shouldn't do",
	"Things you shouldn't collect",
	"Things that confirm you still haven't grown up",
	"Things you shouldn't touch",
	"Things you shouldn't attempt at your age",
	"Things that confirm your small town is backward",
	"Things that would make school more exciting",
	"Things you shouldn't tie to the roof of your car",
	"Things you shouldn't send in the mail",
	"Things that usually make you feel better",
	"Things you would like to do on vacation",
	"Things you would have said to Eve had she tricked you into eating the apple",
	"Things that cause an accident",
	"Things you shouldn't say to get out of a speeding ticket",
	"Things you shouldn't say about your children",
	"Things you shouldn't hold while riding a bike",
	"Things you wish you could predict",
	"Things that hurt",
	"Things you shouldn't give away",
	"Things you hate as punishment",
	"Things you shouldn't advertise on a billboard",
	"Things that are embarrassing",
	"Things you shouldn't do in public",
	"Things that require a lot of patience",
	"Things you shouldn't say to your boss",
	"Things you shouldn't let an amateur do",
	"Things you wish you could erase",
	"Things you say to a telemarketer",
	"Things you wouldn't want to find in your sandwich",
	"Things you shouldn't put in your mouth",
	"Things you shouldn't do at a funeral",
	"Things that exhaust you",
	"Things you shouldn't do at the theater",
	"Things you shouldn't do in the bathtub",
	"Things you shouldn't write on a Valentine's card",
	"Things you shouldn't say to your grandmother",
	"Things that make you jump",
	"Things you won't find in a dictionary",
	"Things you shouldn't say to a flight attendant",
	"Things you shouldn't put on the front lawn",
	"Things that drive you mad",
	"Things that jiggle",
	"Things you shouldn't do in your backyard",
	"Things you wouldn't want to find in your Christmas stocking",
	"Things you wish people would stop talking about",
	"Things you just can't beat",
	"Things you shouldn't call your children",
	"Things you shouldn't do with your mouth open",
	"Things that would make your love life more exciting",
	"Things you shouldn't do at a party",
	"Things that are dirty",
	"Things you've paid too much for",
	"Things you call your mate",
	"Things you shouldn't swallow",
	"Things you shouldn't laugh at",
	"Things you should keep to yourself",
	"Things you wouldn't want your mother to talk about with your girlfriend/boyfriend",
	"Things you shouldn't do on your desk",
	"Things you would like to do in a blackout",
	"Things that make you cry",
	"Things you would do if you had super-human powers",
	"Things that are naughty",
	"Things that make you go ooooh",
	"Things that really need a referee",
	"Things you shouldn't put on the kitchen table",
	"Things you shouldn't do in a hospital",
	"Things you shouldn't say to a police officer",
	"Things you shouldn't lick",
	"Things you would do if you changed genders for a day",
	"Things you wouldn't do for all the money in the world",
	"Things you would rather forget",
	"Things dogs are actually saying when they bark",
	"Things that would be considered a bad habit",
	"Things you would rather be doing right now",
	"Things you shouldn't bite",
	"Things you shouldn't say to your in-laws",
	"Things astronauts complain about in space",
	"Things you shouldn't do with your tongue",
	"Things you wouldn't want to know about your grandmother",
	"Things that make you gag",
	"Things about men that frustrate you",
	"Things you shouldn't say to your mother",
	"Things a chimp thinks about when he sees you at the zoo",
	"Things an ideal mate would do for you",
	"Things you shouldn't forget",
	"Things a doctor shouldn't do while performing surgery",
	"Things you shouldn't say to the First Lady",
	"Things you shouldn't do with glue",
	"Things you hate about the hospital",
	"Things that should have an expiration date",
	"Things you shouldn't do at the beach",
	"Things people like about you",
	"Things you shouldn't say to your doctor",
	"Things that confirm you are losing your mind",
	"Things that don't last very long",
	"Things you didn't realize until it was too late",
	"Things that confirm you have had to much to drink",
	"Things you keep hidden",
	"Things you would like to see in your horoscope",
	"Things you shouldn't lend",
	"Things that take courage",
	"Things you shouldn't say to your teacher",
	"Things you shouldn't do right after you eat",
	"Things you shouldn't do on your first day on the job",
	"Things you shouldn't throw off a building",
	"Things you shouldn't do at the circus",
	"Things you shouldn't capture on videotape",
	"Things women talk about when they go to the restroom together",
	"Things that should come with a manual",
	"Things you shouldn't do on a first date",
	"Things that hang",
	"Things that confirm you have been abducted by aliens",
	"Things you never see in the country",
	"Things you shouldn't try to hold on to",
	"Things a cow thinks about when a farmer milks it",
	"Things that prove you're in a bad restaurant",
	"Things you shouldn't say in group therapy",
	"Things that could get you arrested",
	"Things children shouldn't play with",
	"Things you shouldn't say to your father",
	"Things you want to do before you die",
	"Things you know nothing about",
	"Things a lady shouldn't do",
	"Things you dream about",
	"Things that confirm your car is a lemon",
	"Things that could result in a war",
	"Things you shouldn't say to your wife",
	"Things you would have a robot do",
	"Things cats think about humans",
	"Things you would do if you were a dictator",
	"Things you would like to change",
	"Things you would do if you were a giant",
	"Things you shouldn't pick up",
	"Things that would make meetings more exciting",
	"Things you never remember",
	"Things you keep in your car",
	"Things you shouldn't doodle on",
	"Things that don't make sense",
	"Things you wish you could do in your sleep",
	"Things you would like to study",
	"Things that would get you sent to the Principals office",
	"Things you might complain about in Hell",
	"Things you shouldn't celebrate",
	"Things you hope you can still do when you are 85",
	"Things you shouldn't do when you are naked",
	"Things you shouldn't share",
	"Things that are none of your business",
	"Things you will never see in your lifetime",
	"Things that could spoil your appetite",
	"Things you don't like about family gatherings",
	"Things that could use a good cleaning",
	"Things you shouldn't do on an airplane",
	"Things that make you uncomfortable",
	"Things that must be magic",
	"Things you shouldn't attempt to juggle",
	"Things that are funny",
	"Things you shouldn't do on your honeymoon",
	"Things you hate to be called",
	"Things that would get you discharged from the army",
	"Things you would like to make someone do under hypnosis",
	"Things you shouldn't title a children's book",
	"Things that don't exist but you wish they did",
	"Things you shouldn't do with a computer",
	"Things you would like to do with a bald head",
	"Things that make you scream",
	"Things that would get you fired",
	"Things that warrant an apology",
	"Things you shouldn't do in the shower",
	"Things you would hate to do for a living",
	"Things you shouldn't leave open",
	"Things that very old people shouldn't do",
	"Things you shouldn't do if you want to make a good first impression",
	"Things big dogs think about when they see a Chihuahua",
	"Things that make you feel young",
	"Things you shouldn't play catch with",
	"Things you shouldn't say to your troops before they go to battle",
	"Things you wish you didn't know",
	"Things you shouldn't use as an opening line",
	"Things that make people jealous",
	"Things you would like to add to the Ten Commandments",
	"Things you love to shop for",
	"Things you shouldn't try to do in the dark",
	"Things you would do if you were invisible",
	"Things you shouldn't do in a group of people",
	"Things you can't believe someone actually did",
	"Things that make you angry",
	"Things you shouldn't have to pay for",
	"Things you wish had been taught in school",
	"Things that make you nervous",
	"Things you wish were delivered",
	"Things you would like to wake up to",
	"Things you shouldn't do in a cemetery",
	"Things that are impossible to measure",
	"Things you shouldn't do at your wedding",
	"Things that are better late than never",
	"Things you never see in the city",
	"Things that would probably keep you out of heaven",
	"Things you would like to try",
	"Things you shouldn't do while golfing",
	"Things you shouldn't experiment with",
	"Things that are useless",
	"Things you shouldn't do on a bus",
	"Things you would like to do with chocolate",
	"Things you shouldn't say to break the silence in a conversation",
	"Things you would do with a million dollars",
	"Things you wish you could buy out of vending machines",
	"Things you shouldn't do at a job interview",
	"Things you shouldn't accept from strangers",
	"Things you shouldn't do quickly",
	"Things That Are Harder Than They Look",
	"Things You Shouldn't Do In The Shower",
	"Things You Shouldn't Say To Your Teacher",
	"Things That Make You Angry.",
	"Things You Wish Grew On Trees",
	"Things You Say To A Telemarketer",
	"Things You Would Rather Be Doing Right Now",
	"Things You Would Say To A Pig If It Could Talk",
	"Things You shouldn't post on Internet.",
	"Things Paramedics Shouldn't Say To The Patient On The Way To The Hospital",
	"Things That People Surprisingly PAY For",
	"Things You Shouldn't Say In Group Therapy",
	"Things That Cause Trouble",
	"Things You Shouldn't Eat",
	"Things You Shouldn't Do On Your Desk",
	"Things You Shouldn't Leave Open",
	"Things You Would Do If You Were A Giant",
	"Things You Shouldn't Do In The Bathtub",
	"Things You Can Never Find",
	"Things You Shouldn't Write On A Valentine's Card",
	"Things You Shouldn't Do At The Theater",
	"Things You Shouldn't Say To You Grandmother",
	"Things Kids Know More About Than Adults",
	"Things That Confirm Your Small Town Is Backward",
	"Things That Would Get You Fired",
	"Things You Would Like To Do In A Blackout",
	"Things You Shouldn't Use As An Opening Line",
	"Things You Shouldn't Say To Your Spouse",
	"Things Children Shouldn't Know",
	"Things You Shouldn't Try To Hold On To",
	"Things People Think They Understand",
	"Things That Scare you.",
	"Things That Drive You Mad",
	"Things That Confirm You Still Haven't Grown Up",
	"Things You Won't Find In The Dictionary",
	"Things You Shouldn't Say To Your In-Laws",
	"Things You Wouldn't Want Your Mother To Talk About With Your Girlfriend/Boyfriend",
	"Things That Make You Jump",
	"Things You Shouldn't Touch",
	"Things That Could Spoil Your Appetite",
	"Things That Make You Feel Stupid",
	"Things That Are Embarrassing To Say",
	"Things You Shouldn't try To Do In The Dark",
	"Things You Shouldn't Put On The Front Lawn",
	"Things That Don't Last Very Long",
	"Things You Shouldn't Share",
	"Things That Are Funny",
	"Things That Are Dirty",
	"Things You Shouldn't Attempt At Your Age",
	"Things You Would Like To Ask A Psychic",
	"Things That Would Make School More Exciting",
	"Things You Shouldn't Do Your First Day On The Job",
	"Things Big Dogs Think About When They See A Chihuahua",
	"Things You Shouldn't Do Right After You Eat",
	"Things A Cow Thinks About When A Farmer Milks It",
	"Things You Wish You Could Buy Out Of Vending Machines",
	"Things That Would Be Considered A Bad Habit",
	"Things You Wouldn't Want To Clean",
	"Things You Shouldn't Swallow",
	"Things You Shouldn't Mess Around With",
	"Things That Shouldn't Be Passed From One Generation To The Next",
	"Things You Shouldn't Advertise On A Billboard",
	"Things You Keep Hidden From Others.",
	"Things People Eat Raw",
	"Things You Would Say To Your Dog; But Not Your Girlfriend",
	"Things That Would Make Meetings More Exciting",
	"Things You Shouldn't Do At The Circus",
	"Things You Shouldn't Do At The Circus",
	"Things You Shouldn't Say To A Flight Attendant",
	"Things That Exhaust You",
	"Things You Shouldn't Do At A Funeral",
	"Things You Shouldn't Put In Your Mouth",
	"Things You Shouldn't Collect",
	"Things You Wouldn't Want To Find In Your Sandwich",
	"Things You Wish You Could Erase",
	"Things You Shouldn't Let An Amateur Do",
	"Things You Shouldn't Say To Your Boss",
	"Things You Shouldn't Lick",
	"Things That Require A Lot Of Patience",
	"Things You Shouldn't Forget",
	"Things About Women That Frustrate You",
	"Things You Shouldn't Do While Golfing",
	"Things A Waiter Shouldn't Do",
	"Things You Shouldn't Do In A Cemetery",
	"Things An Ideal Mate Would Do For You",
	"Things That Take Courage",
	"Things You've Paid Too Much For",
	"Things You Shouldn't Lend",
	"Things You Dream About",
	"Things A Chimp Thinks About When He Sees You At The Zoo",
	"Things You Shouldn't Say To A Police Officer",
	"Things That Are Naughty",
	"Things That Should Come With A Manual",
	"Things That Happen Once In A Blue Moon",
	"Things You Call Your Mate",
	"Things That Would Probably Keep You Out Of Heaven",
	"Things You Would Do If You Had Super-Human Powers",
	"Things You Shouldn't Exaggerate",
	"Things You Would Like To Add To The Ten Commandments",
	"Things That Make People Jealous",
	"Things That Very Old People Shouldn't Do",
	"Things That Hang",
	"Things You Shouldn't Attempt To Juggle",
	"Things That Make You Go OOOHH!",
	"Things That Must Be Magic",
	"Things You Wouldn't Want To Find In Your Christmas Stocking",
	"Things That Confirm That Your Life Is Going Downhill",
	"Things You Shouldn't Do At The Beach",
	"Things You Shouldn't Do With Glue",
	"Things You Shouldn't Say To Your Father",
	"Things Dogs Are Actually Saying When They Bark",
	"Things You Wish Worked By Remote Control",
	"Things You Never See On TV",
	"Things You Just Can't Beat",
	"Things That Make You Scream",
	"Things You Wouldn't Want To Know About Your Grandmother",
	"Things A Doctor Shouldn't Do While Performing Surgery",
	"Things You Shouldn't Throw Off A Building",
	"Things Fish Think About As They Swim In Their Aquarium",
	"Things You Could Use As An Excuse On Judgment Day",
	"Things You Would Hate To Do For A Living",
	"Things You Shouldn't Do In a Hospital",
	"Things That Would Make Golf More Exciting",
	"Things You Shouldn't Do If You Want To Make A Good First Impression",
	"Things You Shouldn't Title A Children's Book",
	"Things You Shouldn't Celebrate",
	"Things You Shouldn't Do At A Party",
	"Things You Shouldn't Do At A Job Interview",
	"Things Firemen Do Between Fires",
	"Things You Will Never See In Your Lifetime",
	"Things You Shouldn't Teach Your Parrot To Say",
	"Things You Shouldn't Laugh At",
	"Things You Shouldn't Put Off Until Tomorrow",
	"Things That Shouldn't Be Lumpy",
	"Things You Shouldn't Do In The House",
	"Things You Would Have Said To Eve Had She Tricked You Into Eating The Apple",
	"Things You Would Like To Do On Vacation",
	"Things That Are Wild",
	"Things That Should Have An Expiration Date",
	"Things You Shouldn't Tie To The Roof Of Your Car",
	"Things That Require An Assistant",
	"Things That Hurt",
	"Things You Wouldn't Want To Find In Your Bed",
	"Things You Shouldn't Say To Break The Silence In A Conversation",
	"Things You Should Keep To Yourself",
	"Things You Shouldn't Hold While Riding A Bike",
	"Things You Shouldn't Do On A First Date",
	"Things You Wish You Could Predict",
	"Things You Shouldn't Shout At The Top Of Your Lungs",
	"Things You Would Like To See In Your Horoscope",
	"Things That Confirm You Have Had Too Much To Drink",
	"Things That Are Politically Incorrect",
	"Things You Just Can't Believe",
	"Things You Shouldn't Mix",
	"Things You Would Like To Do With A Bald Head",
	"Things You Shouldn't Bite",
	"Things That Confirm Your Car Is A Lemon",
	"Things You Shouldn't Say To The Prime Minister's Spouse",
	"Things You Wouldn't Want To Be Allergic To",
	"Things You Shouldn't Do In A Group Of People",
	"Things You Shouldn't Do Quickly",
	"Things You Shouldn't Say To Get Out Of A Speeding Ticket",
	"Things You Shouldn't Advertise In The Classified Ads",
	"Things You Hope You Can Still Do When You Are 85",
	"Things That Are Embarrassing",
	"Things That Hurt Your Back",
	"Things You Want To Do Before You Die",
	"Things You Never Remember",
	"Things You Shouldn't Experiment With",
	"Things You Shouldn't Do On Your Honeymoon",
	"Things You Would Do If You Were A Dictator",
	"Things You Shouldn't Accept From Strangers.",
	"Things You Would Like To Do With Chocolate",
	"Things You Shouldn't Do In An Elevator",
	"Things You Hate As Punishment",
	"Things A Lady Shouldn't Do",
	"Things That Would Get You Discharged From The Military",
	"Things That Make You Feel Young",
	"Things You Would Have A Robot Do",
	"Things You Shouldn't Do While Writing A Final Exam",
	"Things You Shouldn't Give Away",
	"Things That Would Make Work More Exciting",
	"Things That Confirm You Have Been Abducted By Aliens",
	"Things You Would Like to Say To The President/Prime Minister",
	"Things Your Parents Forgot To Tell You",
	"Things You Shouldn't Send In The Mail",
	"Things That Usually Make You Feel Better",
	"Things You Never Hear On The Radio",
	"Things You Wish You Could Do With Your Feet",
	"Things Children Shouldn't Play With",
	"Things You Shouldn't Make Fun Of",
	"Things You Would Like To Make Someone Do Under Hypnosis",
	"Things Cannibals Think About While Dining",
	"Things That Shouldn't Go Into A Time Capsule",
	"Things You Know Nothing About",
	"Things That Make You Giggle.",
	"Things You Shouldn't Encourage Your Children To Do",
	"Things You Shouldn't Do On An Airplane",
	"Things You Hate To Be Called",
	"Things That Could Cause An Accident",
	"Things You Shouldn't Teach Your Pets To Do",
	"Things You Shouldn't Keep In Your Pockets",
	"Things You Don't Like About Family Get-Together.",
	"Things You Shouldn't Say About Your Children",
	"Things You Shouldn't Photograph",
	"Things You Wish People Would Stop Talking About",
	"Things You Love To Shop For",
	"Things That Go Bad",
	"Things You Can't Stop",
	"Things You Would Do With A Million Dollars",
	"Things You Wish You Could Borrow",
	"Things Prove You're In A Bad Restaurant",
	"Things Women Talk About When They Go To The Restroom Together",
	"Things That Would Make Ballet More Exciting",
	"Things You Wish Were Delivered.",
	"Things You Would Like As Your Last Words",
	"Things That Are Impossible To Measure",
	"Things That Could Result In A War",
	"Things That Warrant An Apology",
	"Things That Confirm Your House Is Haunted",
	"Things That Tire You Out",
	"Things That Confirm You Are Guilty",
	"Things You Shouldn't Say To Your Dentist",
	"Things That Make a Good Sandwich",
	"Things You Shouldn't Capture On Videotape",
	"Things Grown-Ups Wish They Could Still Do",
	"Things You Shouldn't Do In The Office",
	"Things That Jiggle",
	"Things You Wish You Didn't Know",
	"Things You Hate About The Hospital",
	"Things That Make You Gag",
	"Things That Really Need A Referee",
	"Things You Shouldn't Say To Your Troops Before They Go Into Battle",
	"Things You Shouldn't Do With Your Tongue",
	"Things You Shouldn't Do In Front Of Someone",
	"Things You Notice About Yourself, As You Get Older",
	"Things That Make You Cry",
	"Things Men Know More About Than Women",
	"Things You Can Do To Get Rid Of Unwanted Guests",
	"Things You Shouldn't Do On Vacation",
	"Things You Didn't Realize Until It Was Too Late",
	"Things That Make You Relax",
	"Things That Are Better Late Than Never",
	"Things You Shouldn't Doodle On",
	"Things You Shouldn't Display In Your Cabinet",
	"Things You Wish Had Been Taught In School",
	"Things You Shouldn't Have To Pay For",
	"Things You Eat In A Salad",
	"Things You Shouldn't Pick Up.",
	"Things About People That Frustrate You.",
	"Things You Would Like To Play With",
	"Things That Seem To Take An Eternity",
	"Things That Confirm You Are losing Your Memory.",
	"Things You Shouldn't Do In A Car",
	"Things You Sing About",
	"Things You Would Smoke.",
	"Things That Make A Good Punch Line",
	"Things You Would Wish For If You Found a Genie In A Bottle",
	"Things You Need To Survive",
	"Things You Shouldn't Do With A Computer",
	"Things You Shouldn't Say To Your Parents",
	"Things You Would Like To Study",
	"Things You Would Like To Wake Up To",
	"Things That Don't Exist But You Wish They Did",
	"Things You Can't Believe That Someone Actually Said",
	"Things You Would Do If You Were Invisible",
	"Things You Shouldn't Do At Your Wedding",
	"Things You Wouldn't Do For All The Money In The World",
	"Things You Shouldn't Do When You Are Naked",
	"Things You Shouldn't Put On The Kitchen Table",
	"Things That Are Useless",
	"Things You Never see In The Country",
	"Things You Shouldn't Pay Any Attention To",
	"Things You Can't Believe That Someone Actually Did",
	"Things A Chicken Thinks About When The Farmer Picks Up The Eggs",
	"Things You Shouldn't Do When Having Dinner",
	"Things People Like About You",
	"Things That Could Use A Good Cleaning",
	"Things You Would Line Up To See",
	"Things That Are None Of Your Business",
	"Things That Make You Nervous",
	"Things You Wish You Could Do In Your Sleep",
	"Things There Should Be An Award For",
	"Things That You Pee On",
	"Things You Would Like To Change",
	"Things That You Eat Alive",
	"Things That You Shouldn't Put In Your Butt",
	"Things That Could Get You Arrested",
	"Things That You Suck On",
	"Things You Shouldn't Do On a Bus.",
	"Things Cats Think About Humans",
	"Things That Make You Uncomfortable",
	"Things That Don't Make Sense",
	"Things You Would Like To Try.",
	"Things You Keep In Your Car",
	"Things You Would Do If You Changed Genders For a Day",
	"Things You Shouldn't Play Catch With",
	"Things That Confirm You Are Losing Your Mind",
	"Things You Might Complain About In Hell",
	"Things You Would Rather Forget",
	"Things Astronauts Complain About In Space",
	"Things You Shouldn't Do With Your Mouth Open",
	"Things That Would Make Your Love Life More Exciting",
	"Things You Shouldn't Do In Your Backyard",
	"Things You Never see In The City",
	"Things You Shouldn't Say To Your Doctor",
	"Things That Would Get A Doctor Sued For Malpractice",
	"Things You'll Do When You Retire",
	"Things You Shouldn't Call Your Children",
	"Things That Give You A Headache",
	"Things You Shouldn't Do At The Dinner Table",
	"Things That Make You Go AAAAHH!",
	"Things You Wouldn't Want To Find In Your Attic",
	"Things Women Know More About Than Men",
	"Things People Do When No One Is Looking",
	"Things You Shouldn't Give As A Gift",
	"Things A Gentleman Shouldn't Do"
];
*/

// document.getElementById("card").innerHTML = "Draw a card";
// document.getElementById("remaining").innerHTML = "" + cards.length + " Cards Left";
function myFunction() {
    
	if (!host){
		return 0;
	}

    var id = getRandCardID(); // get rand card from cards list

	getAndshareThing(roomID, id);
}



   




    // getMyUserData(1);
    // console.log(getMyUserData(1));

    /*thing = getThing(id);*/
    // document.getElementById("card").innerHTML = thing; // set HTML ID to card selected
    // writeThing(roomID, thing); // set HTML ID to card selected
    // cards.splice(id, 1); // remove card from pile
    // Updated HTML ID to remaining cards left
    // document.getElementById("remaining").innerHTML = "" + cards.length + " Cards Left";