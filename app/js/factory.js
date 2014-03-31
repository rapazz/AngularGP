'use strict';

/* Factory */

var baseUrl = 'http://localhost/~mbravo/gestiondeProyectos/ServicioGP/public';

angular.module('proyectosAppFactory', ['ngResource']).
  value('version', '0.1');

angular.module('proyectosAppFactory', ['ngResource'])
    .factory('usersLoginRest', ['$resource',
        function($resource){
            return $resource(baseUrl + '/Users/:userId', { userId: '@userId' }, {
                query: {method:'GET', params:{}, isArray:true}
            });
        }])
    .factory('userProject', ['$resource',
        function($resource){
    return $resource(baseUrl + '/:userId/Proyectos', { userId: '@userId' }, {
        query: {method:'GET', params:{}, isArray:true}
    });
}])
    .factory('listaEstados', ['$resource',
        function($resource){
            return $resource(baseUrl + '/listas/statusProyecto', {  }, {
                query: {method:'GET', params:{}, isArray:true}
            });
        }])
    .factory('listaEtapa', ['$resource',
        function($resource){
            return $resource(baseUrl + '/listas/etapaProyecto', {  }, {
                query: {method:'GET', params:{}, isArray:true}
            });
        }])
    .factory('listaSalud', ['$resource',
        function($resource){
            return $resource(baseUrl + '/listas/salud', {  }, {
                query: {method:'GET', params:{}, isArray:true}
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
   .factory('proyectoApi', function ($resource) {
    return $resource(baseUrl + '/proyecto/avance/:id', {"id": '@id'}, {
        query: { method: 'GET',headers: {'Content-Type': 'application/x-www-form-urlencoded'}, isArray: true },
        create: { method: 'POST', isArray: false }

    })
})
    .factory('ApiListas', ['$resource',
        function($resource){
            return {
             Empresas: $resource(baseUrl +'/listas/empresa', {  }, {
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
                })
            }
        }])

.factory('proyectoA', function ($resource) {
    return $resource(baseUrl + '/proyecto', {}, {
        query: { method: 'GET',headers: {'Content-Type': 'application/x-www-form-urlencoded'}, isArray: true },
        create: { method: 'POST', isArray: false }

    })



})
    .factory('planificacionApi', function ($resource) {
        return $resource(baseUrl + '/proyecto/Planificacion', {}, {
            query: { method: 'GET',headers: {'Content-Type': 'application/x-www-form-urlencoded'}, isArray: true },
            create: { method: 'POST', isArray: false }

        })})
