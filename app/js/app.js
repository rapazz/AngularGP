'use strict';


// Declare app level module which depends on filters, and services
angular.module('proyectosApp', [
  'ngRoute',
  'proyectosAppServices',
  'proyectosAppControllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/misProyectos', {templateUrl: 'partials/misProyectos.html', controller: 'MisproyectosCtrl'});
  $routeProvider.otherwise({redirectTo: '/misProyectos'});
}]);

