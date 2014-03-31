'use strict';

angular.module('proyectosAppConstants', [])
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_EVENT',{
       userFound:'USER-FOUND',
        Found:'FOUND',
       userNotFound:'USER-NOT-FOUND',
       userRegister:'USER-REGISTER'
    })
    .constant('AMBIENTES',{
        baseUrl:'http://localhost/~mbravo/gestiondeProyectos/ServicioGP/public',
        cuentaGmail:'',
        apiKeyGoogle:'f3X4tAwnQhCpZ6Nuy7HPHzTB',
        clienteGmail:'831491199430-80elp5cleulr6rc317b0dtbq7ce0ga5p.apps.googleusercontent.com'

    });
