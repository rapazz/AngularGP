'use strict';

/* Factory */

var baseUrl = '../../ServicioGP/public';

angular.module('proyectosAppFactory', ['ngResource']).
  value('version', '0.1');

angular.module('proyectosAppFactory', ['ngResource'])


.factory('usersLoginRest', ['$resource',
        function($resource){
            return $resource(baseUrl + '/Users/:userId', { userId: '@userId' }, {
                query: {method:'GET',headers:{},params:{}, isArray:true}
            });
        }])

.factory('restDashboard', ['$resource',
         function($resource){
        return {
            porSalud:$resource(baseUrl + '/:userId/Proyectos/Salud', { userId: '@userId' }, {
            query: {method:'GET', params:{}, isArray:true}}),
            listadoBP:$resource(baseUrl + '/:userId/Proyectos/listadoBP', { userId: '@userId' }, {
                query: {method:'GET', params:{}, isArray:true}}),
            planificacion:$resource(baseUrl + '/:userId/Proyectos/listadoProgramacion', { userId: '@userId' }, {
                query: {method:'GET', params:{}, isArray:true}}),
            porTipo: $resource(baseUrl + '/:userId/Proyectos/porTipo', { userId: '@userId' }, {
                query: {method:'GET', params:{}, isArray:true}})


        }

    }])

.factory('ApiListas', ['$resource',
        function($resource){
            return {
             Empresas: $resource(baseUrl +'/listas/empresa', {  }, {
                query: {method:'GET', params:{}, isArray:true}
            }),
              statusProyecto:$resource(baseUrl + '/listas/statusProyecto', {  }, {
                    query: {method:'GET', params:{}, isArray:true}
                }),
             tipoEstrategia: $resource(baseUrl +'/listas/estrategiaProyecto', {  }, {
                query: {method:'GET', params:{}, isArray:true}
            }),
             etapaProyecto: $resource(baseUrl + '/listas/etapaProyecto', {  }, {
                    query: {method:'GET', params:{}, isArray:true}
                }),
                saludProyecto: $resource(baseUrl + '/listas/salud', {  }, {
                    query: {method:'GET', params:{}, isArray:true}
                }),
                tipoAdjunto: $resource(baseUrl + '/listas/tipoAdjunto', {  }, {
                    query: {method:'GET', params:{}, isArray:true}
                })
            }
        }])



.factory('listadoAnexos', function ($resource) {
    return $resource(baseUrl + '/proyecto/:id/file/', {id: '@id'}, {
        query: { method: 'GET',headers: {'Content-Type': 'application/x-www-form-urlencoded'}, params:{}, isArray: true }
    })})

