'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('proyectosAppServices', []).
  value('version', '0.1');

//Funcion que arma la programacion.
angular.module('proyectosAppServices', [])
    .service('mesesPlanificiacion', function () {
        
        var dateStr ="";
  var dateObj = new Date()
  var mm =dateObj.getMonth()
  var ArrMeses =[]
  var meses = mm
  for (var i=0;i<=3;i++)
  {
   
   switch(meses)
   {
     case 0:
       ArrMeses.push("ENERO")
         break;
     case 1:
        ArrMeses.push("FEBRERO")
          break;
     case 2:
        ArrMeses.push("MARZO")
          break;
     case 3:
        ArrMeses.push("ABRIL")
          break;
     case 4:
        ArrMeses.push("MAYO")
          break;
     case 5:
        ArrMeses.push("JUNIO")
          break;
     case 6:
        ArrMeses.push("JULIO")
          break;
     case 7:
        ArrMeses.push("AGOSTO")
          break;
     case 8:
        ArrMeses.push("SEPTIEMBRE")
          break;
     case 9:
        ArrMeses.push("OCTUBRE")
          break;
     case 10:
        ArrMeses.push("NOVIEMBRE")
          break;
     case 11:
        ArrMeses.push("DICIEMBRE")
          break;
       
   }
       meses = (meses>11)?0:(meses +1)
  }

var objMeses={}
objMeses.mes1 = ArrMeses[0] 
objMeses.mes2 = ArrMeses[1] 
objMeses.mes3 = ArrMeses[2] 
objMeses.mes4 = ArrMeses[3]   

  return ArrMeses
  
        });
  