(function() {
'use strict';
angular
  .module('red')
  .controller('ReportCtrl', ReportCtrl);


function ReportCtrl($scope, $rootScope, $cookies, $http, $state, $filter){

       var ALIEN_GET_URL = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';
       var ALIEN_POST_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';

        $scope.showValidation = true;

        $scope.encounters = {
          date: $filter('date')(new Date(), 'yyyy-MM-dd'),
          colonist_id: $cookies.getObject('mars_colonizer').id,
        };

       $http({
         method: 'GET',
         url: ALIEN_GET_URL
       }).then(function(response){
           $scope.aliens = response.data.aliens;
       }, function(error){
           // TODO: Handle error
           console.log(error);
       });

       $scope.submitReport = function(reportAlien){
          event.preventDefault();

          $http({
            method: 'POST',
            url: ALIEN_POST_URL,
            data: { 'encounter': $scope.encounters}
          }).then(function(response){
            $state.go('encounters');
          }, function(error){
             console.log(error);
          });
       };
}

})();
