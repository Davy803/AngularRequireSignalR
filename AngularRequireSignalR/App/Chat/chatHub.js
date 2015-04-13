define(function(require) {

    var app = require('Chat/app');

    var User = require("Chat/Models/User");

    app.factory('ChatHub', [
        'Hub', 'chatViewModel', function(Hub, chatViewModel) {

            var ChatHub = function($scope) {
                //Hub setup
                var hub = new Hub('chatRoom', {
                    listeners: {
                        'addUser': function(u) {
                            var user = new User(u);
                            chatViewModel.room.addUser(user);
                            $scope.$apply();
                        },
                        'addMessage': function(message) {
                            chatViewModel.room.addMessage(message);
                            $scope.$apply();
                        }
                    },
                    methods: ['addUser', 'addMessage', 'listUsers', 'listMessages'],
                    errorHandler: function(error) {
                        console.error(error);
                    }
                });

                for (var functionName in hub) {
                    this[functionName] = hub[functionName];
                }
            }

            return ChatHub;
        }
    ]);
});