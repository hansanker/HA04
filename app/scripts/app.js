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

    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/survey', {
      templateUrl: 'survey/survey.html',
      controller: 'SurveyCtrl'
    })
    .when('/teacher', {
      templateUrl: 'teacher/teacher.html',
      controller: 'TeacherCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    
});

app.constant('FBURL', 'https://mijntennisles.firebaseio.com');
app.constant('activeGroup2');


app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('yellow');
});
