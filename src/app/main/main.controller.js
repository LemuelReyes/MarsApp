(function() {
  'use strict';

  angular
    .module('red')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state) {
      this.online = true;
      $scope.description = 'Angular Seed Application';

      $scope.transition = function($event) {
        event.preventDefault();
        $state.go('check-in');
      };

  } //ends mainctrl



})();
