'use strict';

app.controller('TeacherCtrl', ["$scope", "$firebaseObject", "$firebaseArray", "FBURL", "$timeout", function ($scope, $firebaseObject, $firebaseArray, FBURL, $timeout) {


    var personsRef = new Firebase(FBURL + "/Schools/TennisUniversity/Persons");

    $scope.persons = $firebaseArray(personsRef);


    console.log("-------")

    personsRef.orderByChild("email").startAt("hans").on("child_added", function (snapshot) {
    
        //console.log(snapshot.key() + " was " + snapshot.val().email + " meters tall");
    });

    personsRef.orderByChild("email").startAt("hans").on("child_added", function (snapshot) {
        //console.log("test ahsn");
        //console.log(snapshot.key() + " was " + snapshot.val().isTeacher + " meters tall");
    });


    $scope.isTeacher = function (person) {
        var ref2 = new Firebase(FBURL + "/Schools/TennisUniversity/Persons/" + person.$id);


        if (person.isTeacher) {
            ref2.child("isTeacher").remove();

        } else {
            ref2.child("isTeacher").set(true);
        }
    };

    


}]);

