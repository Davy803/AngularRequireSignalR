define(function(require) {
    var statuses = require('Chat/Models/chatStatus');
    var app = require('Chat/app');
    require('Chat/chatHub');
    require('Chat/chatViewModel');

    app.controller('ChatController', [
        '$scope', 'ChatViewModel', 'chatHub', function($scope, vm, hub) {
            $scope.vm = vm;

            var User = require("Chat/Models/User");

            hub.promise.done(function() {
                vm.status = statuses.loading;
                $scope.$apply();
            });

            hub.promise.fail(function(error) {
                console.log('SignalR error: ' + error);
            });

            vm.init = function(room) {
                vm.currentRoom = room;
                hub.promise.done(function() {
                    var userPromise = hub.listUsers(vm.currentRoom).done(function(users) {
                        for (var i = 0; i < users.length; i++) {
                            vm.room.addUser(new User(users[i]));
                        }
                    });
                    var messagePromise = hub.listMessages(vm.currentRoom).done(function(messages) {
                        for (var i = 0; i < messages.length; i++) {
                            vm.room.addMessage(messages[i]);
                        }
                    });
                    $.when.apply(window, [userPromise, messagePromise]).then(function() {
                        $scope.$apply();
                    });
                });
            };

            vm.enterRoom = function() {
                hub.addUser(vm.currentRoom, null, vm.currentUserName).done(function(u) {
                    var user = new User(u);
                    vm.room.addUser(user);
                    vm.currentUser = user;

                    vm.status = statuses.done;
                    $scope.$apply();
                });

            };
            vm.addMessage = function() {
                hub.addMessage(vm.currentRoom, vm.currentUser.id, vm.currentMessage);
            };
        }
    ]);
});