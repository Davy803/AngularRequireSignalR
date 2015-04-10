define(function(require) {
    var statuses = {
        'connecting': 'connecting',
        'loading': 'loading',
        'done': 'done',
    }
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

                ChatApp.status = statuses.connecting;
                ChatApp.currentRoom = null;
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
                ChatApp.init = function(room) {
                    ChatApp.currentRoom = room;
                    hub.promise.done(function() {
                        var userPromise = hub.listUsers(ChatApp.currentRoom).done(function (users) {
                            for (var i = 0; i < users.length; i++) {
                                ChatApp.room.addUser(new User(users[i]));
                            }
                        });
                        var messagePromise = hub.listMessages(ChatApp.currentRoom).done(function (messages) {
                            for (var i = 0; i < messages.length; i++) {
                                ChatApp.room.addMessage(messages[i]);
                            }
                        });
                        $.when.apply(window, [userPromise, messagePromise]).then(function () {
                            $rootScope.$apply();
                        });
                    });
                };

                ChatApp.enterRoom = function () {
                    hub.addUser(ChatApp.currentRoom, null, ChatApp.currentUserName).done(function(u) {
                        var user = new User(u);
                        ChatApp.room.addUser(user);
                        ChatApp.currentUser = user;

                        ChatApp.status = statuses.done;
                        $rootScope.$apply();
                    });

                };
                ChatApp.addMessage = function() {
                    hub.addMessage(ChatApp.currentRoom, ChatApp.currentUser.id, ChatApp.currentMessage);
                };
                hub.promise.done(function() {
                    ChatApp.status = statuses.loading;
                    $rootScope.$apply();
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