'use strict';

angular.module('proyectosAppDirective', [])
    .directive('menu', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                menus: '='
            },
            link: function($scope, $element) {
               
            },
            templateUrl: 'partials/menuIzquierda.html'
        };
    })
    .directive('cabecera', ['googleService',function(googleService) {
        return {
            restrict: 'E',
            replace: true,
            
            link: function($scope, $element) {
               
 googleService.checkAuth().then(function (data) {
                    // do something with returned data
                   
                      $scope.usuario = data.nombre 
                      console.log(data) 
                }, function (err) {
                    console.log('Failed: ' + err);
                });

            },
            templateUrl: 'partials/cabecera.html'
        };
    }]);
    
