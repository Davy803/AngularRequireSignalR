define(function (require) {

    var User = function(user) {
        this.id = user.Id;
        this.name = user.Name;
    };
    return User;
});

