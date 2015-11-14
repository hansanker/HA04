'use strict';

app.controller('MainCtrl',["$scope","FBURL" , function ($scope, FBURL) {


  console.log(FBURL)

  $scope.todos = [];

  $scope.addTodo = function () {
  $scope.todos.push($scope.todo);
  $scope.todo = '';
};

$scope.removeTodo = function (index) {
  $scope.todos.splice(index, 1);
};
    
  }]);
