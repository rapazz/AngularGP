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
    .constant('CONFIG',{
        clientId:'831491199430-80elp5cleulr6rc317b0dtbq7ce0ga5p.apps.googleusercontent.com',
        apiKey:'f3X4tAwnQhCpZ6Nuy7HPHzTB',
        version:'0,5'

    });

