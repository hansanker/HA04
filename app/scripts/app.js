'use strict';

var app = angular
  .module('hc04App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'firebase',
    'ngMaterial'
    
  ]);

 
app.config(function ($routeProvider) {
  $routeProvider

    .when('/attendance', {
      templateUrl: 'module_attendance/attendance.html',
      controller: 'attendanceCtrl'
    })
    .when('/groupAndStudent', {
      templateUrl: 'module_groupAndStudent/groupAndStudent.html',
      controller: 'groupAndStudentCtrl'
    })
    
    
});

app.constant('FBURL', 'https://mijntennisles.firebaseio.com');
app.constant('activeGroup2');


app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('yellow');
});


app.controller('AppCtrl', ['$scope', '$mdSidenav', 'menuService', function($scope, $mdSidenav, menuService){
  $scope.toggleSidenav = function(menuId, item) {
    $mdSidenav(menuId).toggle();
     $scope.selected = item;
     console.log( $scope.selected);
  };
  
}]);



app.service('menuService', ['$q', function($q) {
  var menuItems = [{
      nameNL: 'Groepen en leerlingen',
	    nameEN: 'Groups and Students',
      iconurl: 'https://lh3.googleusercontent.com/-KGsfSssKoEU/AAAAAAAAAAI/AAAAAAAAAC4/j_0iL_6y3dE/s96-c-k-no/photo.jpg',
      imgurl: 'http://muppethub.com/wp-content/uploads/2014/02/Animal-7.png',
      content: 'Organiseren van groepen en leerlingen'
  },{
      nameNL: 'Aanwezigheid',
	  nameEN: 'Attendance',
      iconurl: 'https://lh5.googleusercontent.com/-c5rVqhf66e4/UVIKJ3fXLFI/AAAAAAAAACU/s-TU4ER7-Ro/w800-h800/kimmie.jpg',
      imgurl: 'http://bakadesuyo.bakadesuyo.netdna-cdn.com/wp-content/uploads/2013/12/ways-to-increase-willpower.jpg',
      content: 'Aanwezigheid van leerlingen op de tennisles'
  }];

  // Promise-based API
  return {
      loadAll: function() {
          // Simulate async nature of real remote calls
          return $q.when(menuItems);
      }
  };
}]);