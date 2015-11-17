'use strict';
app.controller('AboutCtrl', function ($scope, FBURL, $firebaseArray) {
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  var analytics = new Firebase(FBURL + "/Schools/TennisUniversity");
  var activeVisitors = analytics.child('activeVisitors');

  var totalVisitors = analytics.child('totalVisitors');
  totalVisitors.transaction(function (currentData) {
    return currentData + 1;
  });

    
  var visitor = {
    path: window.location.pathname,
    arrivedAt: Firebase.ServerValue.TIMESTAMP,
    userAgent: navigator.userAgent
  };


  var activeVisitorRef = activeVisitors.push(visitor, function () {
    activeVisitors.child(visitorId).once('value', function (snapshot) {
      visitor.arrivedAt = snapshot.child('arrivedAt').val();
      
      var pastVisitors = analytics.child('pastVisitors');
      visitor.leftAt = Firebase.ServerValue.TIMESTAMP;
      pastVisitors.child(visitorId).onDisconnect().set(visitor);
    });
  });

  var visitorId = activeVisitorRef.key();
  activeVisitorRef.onDisconnect().remove();
  $scope.activeVisitors2 = $firebaseArray(activeVisitors);
  

});
