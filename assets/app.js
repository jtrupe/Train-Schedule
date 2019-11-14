var config = {
    apiKey: "AIzaSyBN0fVNGQ2GGop7uCaAOFzbvW1SuXKuIso",
    authDomain: "train-schedule-cb4b6.firebaseapp.com",
    databaseURL: "https://train-schedule-cb4b6.firebaseio.com",
    projectId: "train-schedule-cb4b6",
    storageBucket: "train-schedule-cb4b6.appspot.com",
    messagingSenderId: "923263352398",
    appId: "1:923263352398:web:5703e0562d1a9f487c4d1f"
}

firebase.initializeApp(config);

var trainDatabase = firebase.database();

$("#addNewTrain").on("click", function () {
    event.preventDefault();

    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        earliest: firstTrain,
        frequency: trainFrequency
    }

    trainDatabase.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
})

trainDatabase.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().earliest;
    var trainFrequency = childSnapshot.val().frequency;

    var formatFirstTime = moment(firstTrain , "HH:mm") ;
    var timeSinceFirst = moment().diff(formatFirstTime, "minutes") ;
    var timeSinceLast = timeSinceFirst % trainFrequency ;
    var timeToNext = trainFrequency - timeSinceLast ;
    var nextArrivalTime = moment().add( timeToNext , "minutes").format("HH:mm") ;

    console.log(timeToNext);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName) ,
        $("<td>").text(trainDestination) ,
        $("<td>").text(trainFrequency) ,
        $("<td>").text(nextArrivalTime) ,
        $("<td>").text(timeToNext)
    );

    $("#trainTable").append(newRow);

});