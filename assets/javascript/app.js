$(document).ready(function() {


  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyA6TNEVxDsELTIsoeyJsGmNR0H8pg50eOw",
    authDomain: "trainscheduler-7c858.firebaseapp.com",
    databaseURL: "https://trainscheduler-7c858.firebaseio.com",
    projectId: "trainscheduler-7c858",
    storageBucket: "trainscheduler-7c858.appspot.com",
    messagingSenderId: "1025933322174"
  };
  firebase.initializeApp(config);
    
// Create a variable to reference the database.
var database = firebase.database();

  //Button for adding Trains
  $("#submit-train-btn").on("click", function(event) {
  		event.preventDefault();

	 // Takes user input
	  var trainName = $("#train-name-input").val().trim();
	  var TrainArrival = $("#dest-input").val().trim();
	  var firstTrain = $("#firstTrain-input").val().trim();
	  var trainFrequency = $("#freq-input").val().trim();

	  // Creates local "temporary" object for holding train data
	  var newTrain = {
	  	name: trainName,
	  	ArrivingFrom: TrainArrival,
	  	start: firstTrain,
	  	ArrivesEvery: trainFrequency
	  };

	  // Uploads train data to the database
  		database.ref().push(newTrain);


	   // Alert
  		alert("Next train was successfully added");

	 // Clears all of the text-boxes
	  $("#train-name-input").val("");
	  $("#dest-input").val("");
	  $("#firstTrain-input").val("");
	  $("#freq-input").val("");
  	});

  	//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());

	  // Store everything into a variable.
	  var trainName = childSnapshot.val().name;
	  var TrainArrival = childSnapshot.val().ArrivingFrom;
	  var trainFrequency = childSnapshot.val().ArrivesEvery;


	   // Declare variable
  		var trainFrequency;

  		// Time is to be entered on the entry form
   		 var firstTime = 0;

	   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	    console.log(firstTimeConverted);

	  // Current Time
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	  // Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
	    var tRemainder = diffTime % trainFrequency;
	    console.log(tRemainder);

	    // Minute Until Train
	    var tMinutesTillTrain = trainFrequency - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    // Next Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


	  // Add each train's data into the table
	  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + TrainArrival + "</td><td>" + trainFrequency + 
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

});