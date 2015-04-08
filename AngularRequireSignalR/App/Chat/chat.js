app
    .factory('ChatApp', [
        '$rootScope', 'Hub', 'OData', function($rootScope, Hub) {
            var ChatApp = this;

            var ChatRoom = require("Chat/Models/ChatRoom");
            var User = require("Chat/Models/User");
            var Message = require("Chat/Models/Message");

            ChatApp.room = new ChatRoom();

            ChatApp.currentMessage = "";
            ChatApp.currentUser = new User({ id: "1", name: "David" });

            //Hub setup
            var hub = new Hub('chatRoom', {
                listeners: {
                    'addUser': function(user) {
                        ChatApp.room.addUser(user);
                        $rootScope.$apply();
                    },
                    'addMessage': function (userId, text) {
                        ChatApp.room.addMessage(userId, text);
                        $rootScope.$apply();
                    }
                },
                methods: ['lock', 'unlock'],
                errorHandler: function(error) {
                    console.error(error);
                }
            });

            ChatApp.prototype.enterRoom = function (userName) {
                hub.addUser(userName).done(function (user) {
                    ChatApp.room.addUser(new User(user));
                });
                $rootScope.$apply();
            };
            ChatApp.prototype.addMessage = function (text) {
                
                var message = ChatApp.room.addMessage(ChatApp.currentUser.Id, text);

                hub.addMessage(ChatApp.currentUser.Id, text);
                $rootScope.$apply();
            };
        }
    ])
    .controller('ChatController', [
        '$scope', 'ChatApp', function ($scope, ChatApp) {
            $scope.ChatApp = ChatApp;
        }
    ]);