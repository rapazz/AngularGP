'use strict';


// Declare app level module which depends on filters, and services
angular.module('proyectosApp', [
  'ngRoute',
  'proyectosAppServices',
  'proyectosAppControllers',
  'proyectosAppDirective'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/misProyectos', {templateUrl: 'partials/misProyectos.html', controller: 'MisproyectosCtrl'});
  $routeProvider.when('/crearProyecto', {templateUrl: 'partials/creacionProyecto.html', controller: 'crearProyectoCtrl'});
  $routeProvider.when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: 'dashBoardCtrl'});
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'loginCtrl'});

  $routeProvider.otherwise({redirectTo: '/login'});
}]);

