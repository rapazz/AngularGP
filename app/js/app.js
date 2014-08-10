'use strict';


// Declare app level module which depends on filters, and services
angular.module('proyectosApp', [
  'ngRoute',
  'proyectosAppServices',
  'proyectosAppControllers',
  'proyectosAppDirective',
  'proyectosAppConstants',
  'proyectosAppFactory',
  'ui.router',
   'modelProvider'

]).

//configuracion de menu y permisos asociados,
config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state("dashboard", {
      url: "/dashboard",
      templateUrl: "partials/dashboard.html",
      controller: "dashBoardCtrl",
      authenticate: true
    })
    .state("crearProyecto", {
      url: "/crearProyecto",
      templateUrl: "partials/creacionProyecto.html",
      controller: "crearProyectoCtrl",
      authenticate: true
    })
    .state("misProyectos", {
      url: "/misProyectos",
      templateUrl: "partials/misProyectos.html",
      controller: "MisproyectosCtrl",
      authenticate: true
    })
    .state("login", {
      url: "/login",
      templateUrl: "partials/login.html",
      controller: "loginCtrl",
      authenticate: false
    })

      .state("proyecto", {
          url: "/proyecto/:id",
          templateUrl: "partials/proyecto.html",
          controller: "proyectoCtrl",
          authenticate: true
      })

      .state("prueba", {
          url: "/prueba",
          templateUrl: "partials/prueba.html",
          controller: "pruebaCtrl",
          authenticate: false
      })



  // Send to dashboard if the URL was not found
  $urlRouterProvider.otherwise("/dashboard");
});