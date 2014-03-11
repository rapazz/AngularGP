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
    .directive('cabecera', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                menus: '='
            },
            link: function($scope, $element) {
               
            },
            templateUrl: 'partials/cabecera.html'
        };
    });
    
