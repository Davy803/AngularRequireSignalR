define(function(require) {
    var statuses = require('Chat/Models/chatStatus');
    var app = require('Chat/app');
    require('Chat/chatHub');
    require('Chat/chatViewModel');

    app.controller('ChatController', [
        '$scope', 'chatViewModel', 'chatHub', function ($scope, chatViewModel, hub) {
            var _this = this;

            _this.currentMessage = "";
            _this.currentUserName = "";
            _this.currentUser = null;
            
            _this.status = statuses.connecting;
            _this.currentRoomName = null;

            //_this.vm = vm;

            var User = require("Chat/Models/User");

            hub.promise.done(function() {
                _this.status = statuses.loading;
                $scope.$apply();
            });

            hub.promise.fail(function(error) {
                console.log('SignalR error: ' + error);
            });

            _this.init = function (roomName) {
                _this.currentRoomName = roomName;
                hub.promise.done(function() {
                    var userPromise = hub.listUsers(_this.currentRoomName).done(function (users) {
                        for (var i = 0; i < users.length; i++) {
                            chatViewModel.room.addUser(new User(users[i]));
                        }
                    });
                    var messagePromise = hub.listMessages(_this.currentRoomName).done(function (messages) {
                        for (var i = 0; i < messages.length; i++) {
                            chatViewModel.room.addMessage(messages[i]);
                        }
                    });
                    $.when.apply(window, [userPromise, messagePromise]).then(function() {
                        $scope.$apply();
                    });
                });
            };

            _this.enterRoom = function () {
                hub.addUser(_this.currentRoomName, null, _this.currentUserName)
                    .done(function(u) {
                        var user = new User(u);
                        chatViewModel.room.addUser(user);
                        _this.currentUser = user;

                        _this.status = statuses.done;
                        $scope.$apply();
                    });
            };
            _this.addMessage = function () {
                hub.addMessage(_this.currentRoomName, _this.currentUser.id, _this.currentMessage);
                _this.currentMessage = '';
            };
        }
    ]);
});