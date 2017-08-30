      var config = {
        apiKey: "AIzaSyA99J7anEeqTQ9PH7NRne0VrLxc5svcM0g",
        authDomain: "employee-data-management-a8e38.firebaseapp.com",
        databaseURL: "https://employee-data-management-a8e38.firebaseio.com",
        projectId: "employee-data-management-a8e38",
        storageBucket: "employee-data-management-a8e38.appspot.com",
        messagingSenderId: "1022555536333"
      };
      firebase.initializeApp(config)

      var database = firebase.database();

      var trainName = "";
      var trainDest = "";
      var firstTrainTime = 0;
      var minutesAway = 0;
      var convertTime = "";
      var convertFormat = "HH:mm A"
      // var monthsWorked = 0;
      // var totalBill = 0;
      var count = 0;

      $("#submit").on('click', function() {
        event.preventDefault();
        trainName = $("#nameInput").val().trim();
        trainDest = $("#destInput").val().trim();
        firstTrainTime = $("#timeInput").val().trim();
        trainFrequency = $("#freqInput").val().trim();
        convertTime = moment(firstTrainTime, convertFormat);
        minutesAway = moment(convertTime).diff(moment(), 'minutes');
        // monthsWorked = moment().diff(moment(convertTime), 'months');
        // monthRate = $("#rate-input").val().trim();
        // totalBill = monthsWorked * monthRate;

        database.ref().push({
          name: trainName,
          destination: trainDest,
          frequency: trainFrequency,
          arrivaltime: firstTrainTime,
          eta: minutesAway,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
      })

      database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

        var sv = snapshot.val();
        count++;

        console.log(sv);

          $("#trainData").append("<tr><td>"+sv.name+"</td><td>"+sv.destination+"</td><td>"+sv.frequency+"</td><td>"+sv.arrivaltime+"</td><td>"+sv.eta+"</td></tr>");

      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
      firebase.database().ref(".info/connected");