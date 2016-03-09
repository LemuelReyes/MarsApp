(function() {
 'use strict';

 angular
   .module('red')
   .controller('CheckinCtrl', CheckinCtrl);

 /** @ngInject */ //root scope makes a controlelr global and can make it jump to other pages.

 function CheckinCtrl($scope, $rootScope, $state, $cookies, $http) {
       var JOBS_GET_URL = 'https://red-wdp-api.herokuapp.com/api/mars/jobs';
       var COLONIST_POST_URL = 'https://red-wdp-api.herokuapp.com/api/mars/colonists';

       // placeholder object for post request to / colonists
       $scope.colonist = {};

       // fetch all jobs
      $http({
        method: 'GET',
        url: JOBS_GET_URL

      }).then(function(response){
          $scope.jobs = response.data.jobs;
      }, function(error){
        console.log('error');
          // TODO: Handle error
      });

      $scope.showValidation = false;

      $scope.login = function(event){
         event.preventDefault();

if($scope.checkinForm.$invalid) {
    $scope.showValidation = true;
     } else {
         $http({
           method: 'POST',
           url: COLONIST_POST_URL,
           data: {'colonist': $scope.colonist}
         }).then(function(response){
            $cookies.putObject('mars_colonizer', response.data.colonist);
            $state.go('encounters');
         }, function(error){
         });
      }
    };
 }

})();

// (function() {
// 'use strict';
// angular
//   .module('red')
//   .controller('CheckinCtrl', CheckinCtrl);
//
//
// function CheckinCtrl($scope, $http){
//       var JOBS_GET_URL = 'https://red-wdp-api.herokuapp.com/api/mars/jobs';
//       var COLONIST_POST_URL: 'https://red-wdp-api.herokuapp.com/api/mars/colonists';
//       //placeholder object for POST request to /colonists
//       $scope.colonist = {};
//
// // first function shows success and second for failure to load
// // fetch all jobs
//       $http({
//         method: 'GET',
//         url: JOBS_GET_URL
//       }).then(function(response){
//         $scope.jobs = response.data.jobs;
//       }, function(error){
//         // TODO: Handle error
//
//       }); //ends http
//
//       // contract?
//       $scope.login = function(event){
//         event.preventDefault();
//
//         $http({
//           method: 'POST',
//           url: COLONIST_POST_URL,
//           data: {
//             'colonist' : $scope.colonist
//           } //instead of console logging success, you just navigate to next page
//         }).then(function(response){
//           console.log(response);
//         }, function(error){
//           console.log(error);
//         });
//       }; //ends scope.login
//
//
// } //ends CheckinCtrl function
//
// })();
