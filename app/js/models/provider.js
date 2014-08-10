/**
 * Created by mbravo on 11-04-14.
 */
'use strict';

/* Factory */

var baseUrl = '../../ServicioGP/public';

angular.module('modelProvider', ['ngResource']).
    value('version', '0.1')
    .provider('Proyecto', function() {
    this.$get = ['$resource', function($resource) {
        var Proyecto = $resource(baseUrl + '/:userId/proyectos/:id', {}, {
            update: {
                method: 'PUT'
            },
            create: { method:'POST',isArray:false},
            query: {method: 'GET', isArray: false }
        })

        return Proyecto;
    }];
})
    .provider('Avance', function() {
        this.$get = ['$resource', function($resource) {
            var avance  = $resource(baseUrl + '/:userId/proyectos/:id/avance', {}, {
                update: {
                    method: 'PUT'
                },
                create: { method:'POST',isArray:false},
                query: {method: 'GET', isArray: false }
            })

            return avance;
        }];
    })
    .provider('Planificacion',function(){
        this.$get = ['$resource', function($resource) {
            var planificacion  = $resource(baseUrl + '/proyecto/:id/Planificacion', {}, {
                update: {
                    method: 'PUT'
                },
                create: { method:'POST',isArray:false},
                query: {method: 'GET', isArray: false }
            })

            return planificacion;
        }];


    })
    .provider('gastos',function(){
        this.$get = ['$resource', function($resource) {
            var gastos  = $resource(baseUrl + '/proyecto/:id/gastos', {}, {
                update: {
                    method: 'PUT'
                },
                create: { method:'POST',isArray:false},
                query: {method: 'GET', isArray: false }
            })

            return gastos;
        }];


    })