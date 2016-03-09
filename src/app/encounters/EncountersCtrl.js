(function() {
'use strict';
angular
  .module('red')
  .controller('EncountersCtrl', EncountersCtrl);


function EncountersCtrl($scope, $state, $http){

  var ENCOUNTERS_GET_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';

  $scope.transition = function($event) {
    event.preventDefault();
    $state.go('report');
  };

  $http({
    method: 'GET',
    url: ENCOUNTERS_GET_URL
  }).then(function(response){
      $scope.encounters = response.data.encounters;
  }, function(error){
      // TODO: Handle error
      console.log(error);
  });
}

})();
