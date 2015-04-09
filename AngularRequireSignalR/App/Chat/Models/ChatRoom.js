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
    ChatRoom.prototype.addMessage = function (m) {

        var message = new Message(this._userLookup[m.UserId], m.Message);
        this.messages.push(message);
        return message;
    };

    return ChatRoom;
});

