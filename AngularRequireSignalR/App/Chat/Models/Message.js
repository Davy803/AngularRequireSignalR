define(function (require) {

    var Message = function(user, message, timestamp) {
        this.user = user;
        this.message = message;
        this.timestamp = timestamp || new Date();
    };
    return Message;
});

