define(function (require) {
    var angular = require('angular');
    require('angular-signalr');
    //require('Chat/chat');

    var app = angular.module('app', ['SignalR']);
    return app;
});

