define(function(require) {
    var app = require('Chat/app');
    
    require('Chat/chatViewModel');

    app.controller('ChatRoomController', [
        '$scope', 'chatViewModel', function($scope, vm) {
            $scope.room = vm.room;
        }
    ]);
});