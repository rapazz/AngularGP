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
    .directive('cabecera', ['googleService','Session',function(googleService,Session) {
        return {
            restrict: 'E',
            replace: true,
            
            link: function($scope, $element) {
               $scope.usuario= Session.userName;
            },
            templateUrl: 'partials/cabecera.html'
        };
    }]);

    
