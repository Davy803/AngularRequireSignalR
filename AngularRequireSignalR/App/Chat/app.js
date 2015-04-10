define(function (require) {
    var angular = require('angular');
    require('angular-signalr');
    
    var app = angular.module('app', ['SignalR']);
    return app;
});

