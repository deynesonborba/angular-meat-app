"use strict";
exports.__esModule = true;
var User = (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined && another.email === this.email && another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "deyneson@email.com": new User('deyneson@email.com', 'Deyneson', '1'),
    "karine@email.com": new User('karine@email.com', 'Karine', '123')
};
