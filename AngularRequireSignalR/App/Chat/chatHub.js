define(function(require) {

    var app = require('Chat/app');

    var User = require("Chat/Models/User");

    app.factory('chatHub', [
        '$rootScope', 'Hub', 'chatViewModel', function($rootScope, Hub, chatViewModel) {

            //Hub setup
            var hub = new Hub('chatRoom', {
                listeners: {
                    'addUser': function(u) {
                        var user = new User(u);
                        chatViewModel.room.addUser(user);
                        $rootScope.$apply();
                    },
                    'addMessage': function(message) {
                        chatViewModel.room.addMessage(message);
                        $rootScope.$apply();
                    }
                },
                methods: ['addUser', 'addMessage', 'listUsers', 'listMessages'],
                errorHandler: function(error) {
                    console.error(error);
                }
            });

            return hub;
        }
    ]);
});