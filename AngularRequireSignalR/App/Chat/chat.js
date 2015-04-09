define(function(require) {
    var app = require('Chat/app');
    app.factory('ChatApp', [
            '$rootScope', 'Hub', function($rootScope, Hub) {
                var ChatApp = this;

                var ChatRoom = require("Chat/Models/ChatRoom");
                var User = require("Chat/Models/User");

                ChatApp.room = new ChatRoom();

                ChatApp.currentMessage = "";
                ChatApp.currentUserName = "";
                ChatApp.currentUser = null;

                ChatApp.connecting = true;
                //Hub setup
                var hub = new Hub('chatRoom', {
                    listeners: {
                        'addUser': function (u) {
                            var user = new User(u);
                            ChatApp.room.addUser(user);
                            $rootScope.$apply();
                        },
                        'addMessage': function(message) {
                            ChatApp.room.addMessage(message);
                            $rootScope.$apply();
                        }
                    },
                    methods: ['addUser', 'addMessage', 'listUsers', 'listMessages'],
                    errorHandler: function(error) {
                        console.error(error);
                    }
                });

                ChatApp.enterRoom = function () {
                    hub.addUser(null, ChatApp.currentUserName).done(function (u) {
                        var user = new User(u);
                        ChatApp.room.addUser(user);
                        ChatApp.currentUser = user;
                    });
                };
                ChatApp.addMessage = function() {
                    hub.addMessage(ChatApp.currentUser.id, ChatApp.currentMessage);
                };
                hub.promise.done(function () {
                    var userPromise = hub.listUsers().done(function(users) {
                        for (var i = 0; i < users.length; i++) {
                            ChatApp.room.addUser(new User(users[i]));
                        }
                    });
                    var messagePromise = hub.listMessages().done(function (messages) {
                        for (var i = 0; i < messages.length; i++) {
                            ChatApp.room.addMessage(messages[i]);
                        }
                    });
                    $.when.apply(window, [userPromise, messagePromise]).then(function() {
                        ChatApp.connecting = false;
                        $rootScope.$apply();
                    });
                });
                hub.promise.fail(function (error) {
                    console.log('SignalR error: ' + error);
                });
                return ChatApp;
            }
        ])
        .controller('ChatController', [
            '$scope', 'ChatApp', function($scope, ChatApp) {
                $scope.ChatApp = ChatApp;
            }
        ]);
});