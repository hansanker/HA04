'use strict';


app.controller('SurveyCtrl', ["$scope", "$firebaseObject", "$firebaseArray", "FBURL", "$mdDialog",  "$rootScope", function ($scope, $firebaseObject, $firebaseArray, FBURL, $mdDialog, $rootScope) {

  var ref = new Firebase(FBURL);

  var personsRef = new Firebase(FBURL + "/Schools/TennisUniversity/Persons");
  $scope.persons = $firebaseArray(personsRef);

  var groupRef = new Firebase(FBURL + "/Schools/TennisUniversity/Groups");
  $scope.groups = $firebaseArray(groupRef);


  var query = personsRef.orderByChild("firstName").limitToLast(5);
  $scope.filteredMessages = $firebaseArray(query);




   
  //declarations new group
  $scope.days = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'];
  $scope.groupFilter = "";
  $scope.newGroupForm = {};
  $scope.newGroupForm.niveau = "";
  $scope.newGroupForm.time = "";
  $scope.newGroupForm.trainer = "";
  $scope.newGroupForm.day = "";

  
  
  //declarations new student
  $scope.newUserForm = {};
  $scope.newUserForm.firstName = "";
  $scope.newUserForm.lastName = "";
  $scope.newUserForm.email = "";
  $scope.newUserForm.phone = "";
  $scope.newUserForm.remark = "";
  $scope.newUserForm.level = "";
  
  // open dialog functions
  $scope.showConfirm = function (ev) {
    var confirm = $mdDialog.confirm()
      .title('Groep ' + $scope.selectedGroupName + ' verwijderen?')
      .content('')
      .ariaLabel('Verwijder groep')
      .targetEvent(ev)
      .ok('Groep verwijderen')
      .cancel('Toch niet...');
    $mdDialog.show(confirm).then(function () {
      ref.child("/Schools/TennisUniversity/Groups/" + $scope.selectedGroup).remove();
    }, function () {
      $scope.status = 'You decided to keep your debt.';
    });
  };

  $scope.showConfirmDeletePerson = function (ev) {
    var confirm = $mdDialog.confirm()
      .title('Groep ' + $scope.selectedPersonName + ' verwijderen?')
      .content('')
      .ariaLabel('Verwijder leerling')
      .targetEvent(ev)
      .ok('Leerling verwijderen')
      .cancel('Toch niet...');
    $mdDialog.show(confirm).then(function () {
      ref.child("/Schools/TennisUniversity/Persons/" + $scope.selectedPerson).remove();
    }, function () {
      $scope.status = 'You decided to keep your debt.';
    });
  };

  $scope.showAdvancedDialog = function (ev, url) {
    $mdDialog.show({
      controller: 'DialogController',
      templateUrl: 'survey/' + url + '.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false
    })
      .then(function (answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.status = 'You cancelled the dialog.';
      });
  };

  $scope.newGroup = function () {
    var ref2 = new Firebase(FBURL + "/Schools/TennisUniversity/Groups");
    var fullGroupName = $scope.newGroupForm.day + "-" + $scope.newGroupForm.time + "-" + $scope.newGroupForm.trainer;
    ref2.push({ groupName: fullGroupName, time: $scope.newGroupForm.time, day: $scope.newGroupForm.day, trainer: $scope.newGroupForm.trainer });
    $scope.answer("OK")
  };

  $scope.newStudent = function () {
    ref.child("/Schools/TennisUniversity/Persons").push({ firstName: $scope.newUserForm.firstName, lastName: $scope.newUserForm.lastName, email: $scope.newUserForm.email, phone: $scope.newUserForm.phone, level: $scope.newUserForm.level, remarkt: $scope.newUserForm.remark });
    $scope.answer("OK");
  };

  //after select a group in the group list
  $scope.selectGroup = function (groupObject) {

    $scope.groupObject = groupObject;
    $scope.selectedGroupName = groupObject.day + '-' + groupObject.time + '-' + groupObject.trainer;
    $rootScope.selectedGroup = groupObject.$id;
    $scope.activeGroupObject = $firebaseObject(ref.child("/Schools/TennisUniversity/Groups/").child(groupObject.$id));
    $scope.personsInGroup = [];


    ref.child("/Schools/TennisUniversity/Groups/" + groupObject.$id + "/persons").on('child_added', function (snapshot) {
      var groupKey = snapshot.key();
      ref.child("/Schools/TennisUniversity/Persons/" + groupKey).once('value', function (snapshot) {
        var firstName = snapshot.child('firstName').val();
        var lastName = snapshot.child('lastName').val();
        var email = snapshot.child('email').val();
        $scope.personsInGroup.push({ 'firstName': firstName, 'lastName': lastName, 'email': email, 'key': groupKey });
      });
    });
  };


  if ($rootScope.selectedGroup) {
    $scope.activeGroupObject = $firebaseObject(ref.child("/Schools/TennisUniversity/Groups/").child($rootScope.selectedGroup)).$bindTo($scope, "bindedGroup");
    $scope.selectedGroupName = $scope.activeGroupObject.day + '-' + $scope.activeGroupObject.time + '-' + $scope.activeGroupObject.trainer
  };
  
  //after select a person in the person list
  $scope.selectPerson = function (personObject) {
    $scope.personObject = personObject;
    $scope.selectedPersonName = personObject.firstName + ' ' + personObject.lastName;
    $rootScope.selectedPerson = personObject.$id;
    $scope.activePersonObject = $firebaseObject(ref.child("/Schools/TennisUniversity/Persons/").child(personObject.$id));

    $scope.groupsByPerson = [];
    ref.child("/Schools/TennisUniversity/Persons/" + personObject.$id + "/groups").on('child_added', function (snapshot) {
      var personKey = snapshot.key();
      ref.child("/Schools/TennisUniversity/Groups/" + personKey).once('value', function (snapshot) {
        var day = snapshot.child('day').val();
        var time = snapshot.child('time').val();
        var trainer = snapshot.child('trainer').val();
        $scope.groupsByPerson.push({ 'day': day, 'time': time, 'trainer': trainer, 'key': personKey });
      });
    });
  };

  if ($rootScope.selectedPerson) {
    $scope.activePersonObject = $firebaseObject(ref.child("/Schools/TennisUniversity/Persons/").child($rootScope.selectedPerson)).$bindTo($scope, "bindedPerson");
    $scope.selectedPersonName = $scope.activePersonObject.firstName + '-' + $scope.activePersonObject.lastName;
  };



  $scope.addPersonInGroup = function () {
    ref.child("/Schools/TennisUniversity/Groups/" + $scope.activeGroupObject.$id + "/persons/" + $scope.activePersonObject.$id).set(true);
    ref.child("/Schools/TennisUniversity/Persons/" + $scope.activePersonObject.$id + "/groups/" + $scope.activeGroupObject.$id).set(true);
    $scope.selectGroup($scope.groupObject);
  };

  $scope.removePersonInGroup = function (person) {
    ref.child("/Schools/TennisUniversity/Groups/" + $scope.activeGroupObject.$id + "/persons/" + person.key).remove();
    ref.child("/Schools/TennisUniversity/Persons/" + person.key + "/groups/" + $scope.activeGroupObject.$id).remove();

    $scope.selectGroup($scope.groupObject);
  };

  $scope.checkPersonInGroup = function (person) {
    var ref4 = new Firebase("https://mijntennisles.firebaseio.com/Schools/TennisUniversity/Groups/" + $scope.selectedGroup + "/persons/" + person.$id);
    ref4.once('value', function (snap) {
      var result = snap.val() === null ? 'is not' : 'is';
      console.log('Mary ' + result + ' a member of alpha group');
    });
  };
}])


app.controller('DialogController', function DialogController($scope, $mdDialog, $rootScope) {

  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
});