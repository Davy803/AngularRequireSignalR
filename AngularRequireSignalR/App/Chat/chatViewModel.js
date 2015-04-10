define(function(require) {
    var statuses = require('Chat/Models/chatStatus');
    var app = require('Chat/app');

    app.factory('ChatViewModel', [
        function() {
            var ChatViewModel = this;

            var ChatRoom = require("Chat/Models/ChatRoom");
            
            ChatViewModel.room = new ChatRoom();

            ChatViewModel.currentMessage = "";
            ChatViewModel.currentUserName = "";
            ChatViewModel.currentUser = null;

            ChatViewModel.status = statuses.connecting;
            ChatViewModel.currentRoom = null;

            return ChatViewModel;
        }
    ]);
});