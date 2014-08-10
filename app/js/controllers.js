'use strict';

/* Controllers */


// Modulo de carga inicial.
// se cargan las librerias referenciadas index.html.
angular.module('proyectosAppControllers', ['ui.bootstrap','angularFileUpload'
        ])
    // se llama por cada carga de controlador.
    .run(function ($rootScope, $state,Session) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

      if (toState.authenticate){
        // User isn’t authenticated
       if (Session.authenticate==null){
         console.log('Failed: ');
                   event.preventDefault(); 
                    $state.transitionTo("login");

       }
        
      }
    });
  })





   .controller('modalProgramacion', ['$scope','$modalInstance','$http','mesesPlanificacion','ApiListas','USER_EVENT','Planificacion','idProyecto',function($scope, $modalInstance,$http,mesesPlanificacion,ApiListas,USER_EVENT,Planificacion,idProyecto) {
$scope.planificacion = {};
$scope.meses =mesesPlanificacion
$scope.planificacion.mes1=''
$scope.planificacion.mes2=''
$scope.planificacion.mes3=''
 $scope.planificacion.mes4=''
 $scope.planificacion.planificacion.estadoMes1=''
        $scope.planificacion.planificacion.estadoMes1=''
        $scope.planificacion.planificacion.estadoMes2=''
        $scope.planificacion.planificacion.estadoMes3=''
        $scope.planificacion.planificacion.estadoMes4=''



        ApiListas.etapaProyecto.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {

               $scope.etapaProyecto= ApiListas.etapaProyecto;
            }
        });


        ApiListas.etapaProyecto.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {

                $scope.etapaProyecto= ApiListas.etapaProyecto;
            }
        });

        Planificacion.get({id:idProyecto},function(listadoPlanificacion) {
            if (listadoPlanificacion.status==USER_EVENT.Found)
            {

                $scope.arrProgramacion= listadoPlanificacion.programacion;
            }
        });



/*
        $http.get('json/programacion.json').success(function(data) {
$scope.arrProgramacion= data 
})
*/

  $scope.crearPlanificacion = function () {

      var postData = new Planificacion();

      $scope.planificacion.mes1= $scope.meses[0];
      $scope.planificacion.mes2= $scope.meses[1];
      $scope.planificacion.mes3= $scope.meses[2];
      $scope.planificacion.mes4= $scope.meses[3];
      postData.idproyecto = idProyecto;

      $scope.planificacion.idproyecto =idProyecto;

      postData.$create($scope.planificacion, function(data){

          $scope.data = data;
          $modalInstance.dismiss('cancel');
      })


  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  }])



        .controller('dashBoardCtrl', ['$scope','$http','$modal','mesesPlanificacion','restDashboard','Session','USER_EVENT',function($scope,$http,$modal,mesesPlanificacion,restDashboard,Session,USER_EVENT){

        $scope.pSanos=0;
        $scope.pAlerta = 0;
        $scope.pCriticos=0;
        restDashboard.porSalud.get({userId:Session.userId},function(proyectosporSalud) {

            if (proyectosporSalud.status==USER_EVENT.Found)
            {

                for(var i=0;i<proyectosporSalud.porSalud.length;i++){

                    switch (proyectosporSalud.porSalud[i].Tipo) {
                        case "1":
                            $scope.pSanos  =proyectosporSalud.porSalud[i].cantidad
                            break;
                        case "2":
                            $scope.pAlerta  =proyectosporSalud.porSalud[i].cantidad
                            break;
                        case "3":
                            $scope.pCriticos  =proyectosporSalud.porSalud[i].cantidad
                            break;
                    }


                }



            }
        });

        $scope.sortListadoBP = {
            column: 'beneficios',
            descending: false
        };


        $scope.changeSorting = function(column) {
            var sort = $scope.sortListadoBP;
            if (sort.column == column) {
                sort.descending = !sort.descending;
            } else {
                sort.column = column;
                sort.descending = false;
            }
        };


        restDashboard.listadoBP.get({userId:Session.userId},function(proyectosBP) {



            if (proyectosBP.status==USER_EVENT.Found)
            {
                $scope.arrProyectos =proyectosBP.proyectos;

            }

        });

        restDashboard.planificacion.get({userId:Session.userId},function(planificacion) {


            if (planificacion.status==USER_EVENT.Found)
            {
                $scope.arrProgramacion =planificacion.programacion;
                $scope.meses =mesesPlanificacion

            }

        });


        //Proyectos por Etapa/Estado


        restDashboard.porTipo.get({userId:Session.userId},function(porTipo) {

$scope.porTipo = porTipo.porTipo;

        });






   }
])
  .controller('loginCtrl', ['$scope', 'googleService','$state','$routeParams', 'usersLoginRest','Session','USER_EVENT',function($scope, googleService,$state,$routeParams, usersLoginRest,Session,USER_EVENT) {
        $scope.mostrarMensaje=false
$scope.login = function () {

                googleService.login().then(function (data) {
                    //TODO: mejorar como puedo usar el metodo promise para evitar el settimeout.
                    setTimeout(function(){
                        usersLoginRest.get({userId:data.email}, function(usersLoginRest, headers) {
                            if (usersLoginRest.status==USER_EVENT.userFound)
                            {

                                //crear Session de usuario

                                Session.create(data.id,data.email,usersLoginRest.rol,data.nombre,usersLoginRest.user.bp,headers('token'),headers('tokenKey'))
                                $state.transitionTo("dashboard");
                            }
                            else
                            {
                                //TODO FALTA DEFINIR MENSAJE Y METODO SI NO EXISTE EL USUARIO

                                $scope.mostrarMensaje=true;
                            }


                        });

                    },2000);



                }, function (err) {
                    console.log('Failed: ' + err);
                });
            };



   
   }])








//  Metodos validados

//asociado a la pagina de mis proyectos.
.controller('MisproyectosCtrl', ['$scope','$modal','Proyecto','Session','USER_EVENT',function($scope,$modal,Proyecto,Session,USER_EVENT) {


    $scope.sortListado = {
        column: 'idProyecto',
        descending: false
    };

    $scope.changeSorting = function(column) {
        var sort = $scope.sortListado;
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
    };

    Proyecto.query({userId:Session.userId},function(data) {
        if (data.status==USER_EVENT.Found)
            $scope.arrProyectos =data.proyectos ;


    });

//control que maneja la ventana pop up
    $scope.openDialog=function(id,tipo){
        var templateUrl =''
        var controlador = ''
console.log(id)
        $scope.idproyecto=id;
        switch (tipo) {
            case 'status':
                templateUrl = 'partials/modal_Avance.html'
                controlador =  'modalActualizarEstado'
                break
            case 'programacion':
                templateUrl = 'partials/modal_programacion.html'
                controlador =  'modalProgramacion'
                break
            case 'adjuntos':
                templateUrl = 'partials/modal_adjuntos.html'
                controlador =  'modalAdjunto'
                break
            case 'gastos':
                templateUrl = 'partials/modal_gastos.html'
                controlador =  'modalGastos'
                break


        }
        var modalInstance = $modal.open({
            templateUrl: templateUrl,
            controller: controlador,
            resolve: {
                idProyecto: function () {

                    return id;

                }
            }
        });


      //cuando la ventana modal se cierra actualizo la ventana
        modalInstance.result.then(function () {


            Proyecto.query({userId:Session.userId},function(data) {
                if (data.status==USER_EVENT.Found)
                {
                    $scope.arrProyectos =data.proyectos;
                }
            });


        }, function () {
            Proyecto.get({userId:Session.userId},function(data) {
                if (data.status==USER_EVENT.Found)
                {
                    $scope.arrProyectos =data.proyectos;
                }
            });


        });

    }

}])
    //Vista de la ficha de proyecto
    .controller('proyectoCtrl', ['$state','$scope','mesesPlanificacion','Session','USER_EVENT','Proyecto',function($state,$scope,mesesPlanificacion,Session,USER_EVENT,Proyecto){

        Proyecto.get({id:$state.params.id},function(data) {
            if (data.status==USER_EVENT.Found)
            {

                $scope.proyecto= data.proyecto;
                $scope.arrAnexos=data.proyecto.anexos;
                $scope.arrProgramacion = data.proyecto.programacion;
                $scope.meses =mesesPlanificacion

            }

        });



    }])
    .controller('modalGastos', ['$scope','$modalInstance','USER_EVENT','idProyecto','gastos',function($scope, $modalInstance,USER_EVENT,idProyecto,gastos) {
$scope.gastos=[]
$scope.gasto=new gastos();

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.agregar = function(){

          $scope.gastos.push($scope.gasto);
          $scope.gasto = new gastos();
        };

        $scope.editar= function(objeto){
            $scope.gasto = objeto

        }
        $scope.eliminar= function(objeto){
            $scope.gastos.splice($scope.gastos.indexOf( objeto ),1);


        }

        $scope.totalGasto = function(){

            var sum = 0;
            for( var t=0; t < $scope.gastos.length; t++) { sum += $scope.gastos[t].valor }

            return  sum;
        }

    }])

    .controller('modalAdjunto', ['$upload','$scope','$modalInstance','USER_EVENT','idProyecto','ApiListas','listadoAnexos',function($upload,$scope, $modalInstance,USER_EVENT,idProyecto,ApiListas,listadoAnexos) {
        $scope.adjunto={};
        $scope.adjunto.descripcion='';
        $scope.adjunto.tipoAdjunto='';

        $scope.adjunto.idProyecto =idProyecto;
        ApiListas.tipoAdjunto.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {

                $scope.tipoAdjunto= ApiListas.tipoAdjunto;
            }
        });


        listadoAnexos.get({id:idProyecto},function(listadoAnexos) {
            if (listadoAnexos.status==USER_EVENT.Found)
            {

                $scope.arrAnexos= listadoAnexos.anexos;
            }
        });

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.deshabilitarControl =function(){

            if ($scope.adjunto.descripcion=='' ||$scope.adjunto.tipoAdjunto=='' )
                return  true
            else
                return false
        }

        $scope.onFileSelect = function($files) {
            //$files: an array of files selected, each file has name, size, and type.
            //     for (var i = 0; i < $files.length; i++) {
            var file = $files[0];
            $scope.upload = $upload.upload({
                url: '../../ServicioGP/public/proyecto/'+ $scope.adjunto.idProyecto + '/file', //upload.php script, node.js route, or servlet url
                // method: POST or PUT,
                // headers: {'header-key': 'header-value'},
                // withCredentials: true,
                data: {myObj: $scope.adjunto},
                file: file // or list of files: $files for html5 only
                /* set the file formData name ('Content-Desposition'). Default is 'file' */
                //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                //formDataAppender: function(formData, key, val){}
            }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                listadoAnexos.get({id:idProyecto},function(listadoAnexos) {
                    if (listadoAnexos.status==USER_EVENT.Found)
                    {

                        $scope.arrAnexos= listadoAnexos.anexos;
                        $scope.adjunto={};
                        $scope.adjunto.descripcion='';
                        $scope.adjunto.tipoAdjunto='';



                    }
                });


            });
            //.error(...)
            //.then(success, error, progress);
            //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
            // }
            /* alternative way of uploading, send the file binary with the file's content-type.
             Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
             It could also be used to monitor the progress of a normal http post/put request with large data*/
            // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
        };



    }])


    .controller('modalActualizarEstado', ['$scope','$modalInstance','USER_EVENT','idProyecto','ApiListas','Avance',function($scope, $modalInstance,USER_EVENT,idProyecto,listas,Avance) {

        $scope.proyecto ={};


        // CARGA DE LISTAS
        listas.statusProyecto.get({},function(listaEstados) {
            if (listaEstados.status==USER_EVENT.Found)
            {
                $scope.estadoProyecto= listaEstados.statusProyecto;
            }
        });

        listas.etapaProyecto.get({},function(listaEtapa) {
            if (listaEtapa.status==USER_EVENT.Found)
            {
                $scope.etapaProyecto= listaEtapa.etapaProyecto;

            }
        });

        listas.saludProyecto.get({},function(listaSalud) {
            if (listaSalud.status==USER_EVENT.Found)
            {
                $scope.saludProyecto= listaSalud.saludProyecto;


            }


        });

//FIN DE CARGA LISTAS DESPLEGABLES
        Avance.get({id:idProyecto},function(data) {
            if (data.status==USER_EVENT.Found)
            {

                $scope.proyecto= data.avance;


            }


        });

//Acciones
        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };



        $scope.actualizarProyecto = function () {



            var postData = new Avance();
            postData.id = idProyecto;
            postData.$create({id:idProyecto,proyecto:$scope.proyecto}).then(function(response) {

                $modalInstance.dismiss('cancel');
            })



        };



        //fin Acciones
    }])
    .controller('crearProyectoCtrl', ['$state','$location','$scope','$modal','ApiListas','USER_EVENT','Proyecto','Session',function($state,$location,$scope,$modal,ApiListas,USER_EVENT,Proyecto,Session) {

        $scope.proyecto ={};
        $scope.mostrarMensaje=false;
        ApiListas.Empresas.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {

                $scope.empresa= ApiListas.Empresas;
            }
        });
        ApiListas.tipoEstrategia.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {

                $scope.estrategia= ApiListas.Estrategia;
            }
        });

        ApiListas.etapaProyecto.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {

                $scope.etapaProyecto= ApiListas.etapaProyecto;
            }
        });

        ApiListas.saludProyecto.get({},function(ApiListas) {
            if (ApiListas.status==USER_EVENT.Found)
            {

                $scope.saludProyecto= ApiListas.saludProyecto;
            }
        });





        $scope.crearProyecto = function () {
            $scope.submitted=true;

            if ($scope.form.$valid)
            {
                var postData = new Proyecto();
                $scope.proyecto.jefeProyecto = Session.userId;
                $scope.proyecto.bP=Session.bp;
                postData.$create($scope.proyecto, function(data){


                    $scope.data = data;
                    $scope.submitted=true;
                    $state.transitionTo("dashboard");
                })

            }
            else
            {
                $scope.mostrarMensaje=true;
                $location.hash('mensaje');
                //TODO agregar mensaje
            }

        };



    }])