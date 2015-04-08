define(function (require) {

    var Message = require('Chat/Models/Message');

    var ChatRoom = function() {
        this._userLookup = {};
        this.users = [];
        this.messages = [];
    };
    ChatRoom.prototype.addUser = function(user) {
        this.users.push(user);
        this._userLookup[user.id] = user;
    };
    ChatRoom.prototype.addMessage = function (userId, text) {

        var message = new Message(this._userLookup[userId], text);
        this.messages.push(message);
        return message;
    };

    return ChatRoom;
});

