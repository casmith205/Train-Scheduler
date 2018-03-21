// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC7tD9jRt1ucX-SW7kOMD9RSylIyUkeBBQ",
    authDomain: "trainscheduler-b3bd1.firebaseapp.com",
    databaseURL: "https://trainscheduler-b3bd1.firebaseio.com",
    projectId: "trainscheduler-b3bd1",
    storageBucket: "",
    messagingSenderId: "985949453186"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  

//Button for adding new trains - then update the html + update the database
$("#addTrain").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#trainInput").val().trim();
    var trainDest = $("#destInput").val().trim();
    var trainFirstTime = $("#firstTimeInput").val().trim()
    var trainFreq = $("#freqInput").val().trim();
  
    // Creates local object for holding employee data
    // This is a temporary object that will be overridden every time it is clicked
    var newTrain = {
      name: trainName,
      dest: trainDest,
      firstTime: trainFirstTime,
      frequency: trainFreq
    };

    // Push temporary object to database
    database.ref().push(newTrain);

    // Empty input boxes
    $("#trainInput").val("");
    $("#destInput").val("");
    $("#firstTimeInput").val("");
    $("#freqInput").val("");

});

// 3. Create a way to retrieve employees from the employee database 
// Calculate 

database.ref().on("child_added", function(snapshot, prevChildKey){
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    // Store everything into a variable.
    var trainName = snapshot.val().name;
    var trainDest = snapshot.val().dest;
    var trainFirstTime = snapshot.val().firstTime;
    var trainFreq = snapshot.val().frequency;

    // We need this to equal the present time
    var presentTime=moment();
 
    var arrivalTime = trainFirstTime

    if (arrivalTime < presentTime){
      arrivalTime += freq
    } else {
      var nextArrival = arrivalTime
    }
   
    var minAway = moment().diff(moment(nextArrival), "minutes");

    $("#trainTable").append("<tr><td>"+trainName+"</td><td>"+trainDest+"</td><td>"
    +trainFreq+"</td><td>"+nextArrival+"</td><td>"+minAway+"</td>");
})