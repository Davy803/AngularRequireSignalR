define(function(require) {
    var statuses = require('Chat/Models/chatStatus');
    var app = require('Chat/app');

    var ChatRoom = require("Chat/Models/ChatRoom");

    app.service('chatViewModel', [
        function() {
            var chatViewModel = {};
            
            chatViewModel.room = new ChatRoom();

            chatViewModel.currentMessage = "";
            chatViewModel.currentUserName = "";
            chatViewModel.currentUser = null;

            chatViewModel.status = statuses.connecting;
            chatViewModel.currentRoomName = null;

            return chatViewModel;
        }
    ]);
});