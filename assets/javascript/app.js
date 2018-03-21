// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed



// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyALBMmYA-jDjIc-9MdN_SnC-aWQnpriwxY",
    authDomain: "myfirstfirebase-c83a6.firebaseapp.com",
    databaseURL: "https://myfirstfirebase-c83a6.firebaseio.com",
    projectId: "myfirstfirebase-c83a6",
    storageBucket: "myfirstfirebase-c83a6.appspot.com",
    messagingSenderId: "31015037721"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();
  

// 2. Create button for adding new employees - then update the html + update the database
$("#addEmployee").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    console.log($("#employeeNameInput").val());
    var employeeName = $("#employeeNameInput").val().trim();
    var employeeRole = $("#roleInput").val().trim();
    var employeeStart = $("#startDateInput").val().trim()
    var employeeRate = $("#monthlyRateInput").val().trim();
  
    // Creates local object for holding employee data
    // This is a temporary object that will be overridden every time it is clicked
    var newEmployee = {
      name: employeeName,
      role: employeeRole,
      start: employeeStart,
      rate: employeeRate
    };

    var empRef = database.ref("/employees");
    // Push temporary object to database
    database.ref().push(newEmployee);

    // Empty input boxes
    $("#employeeNameInput").val("");
    $("#roleInput").val("");
    $("#startInput").val("");
    $("#monthlyRateInput").val("");

});

// 3. Create a way to retrieve employees from the employee database 
// Calculate 

database.ref().on("child_added", function(snapshot, prevChildKey){
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    // Store everything into a variable.
    var empName = snapshot.val().name;
    var empRole = snapshot.val().role;
    var empStart = snapshot.val().start;
    var empRate = snapshot.val().rate;

    var empStartPretty = moment(empStart).format("MM/DD/YY");

    // Need to get this to be a non-static number
    var empMonthsWorked = moment().diff(moment(empStart), "months")
    var empTotalBilled = empMonthsWorked*empRate;

    $("#importantTable").append("<tr><td>"+empName+"</td><td>"+empRole+"</td><td>"
    +empStartPretty+"</td><td>"+empMonthsWorked+"</td><td>"+empRate+"</td><td>"+empTotalBilled+"</td>");
})