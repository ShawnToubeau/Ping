"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var dbUrl = 'http://localhost:3000/users';
exports.getAllUsers = function (req, res) {
    axios_1.default
        .get(dbUrl)
        .then(function (dbRes) {
        var users = dbRes.data;
        if (users) {
            res.send(users);
        }
    })
        .catch(function (err) {
        res.send(err);
    });
};
exports.getUser = function (req, res) {
    var userId = req.params.id;
    if (userId) {
        axios_1.default
            .get(dbUrl + "/" + userId)
            .then(function (dbRes) {
            var user = dbRes.data;
            if (user) {
                res.send(user);
            }
        })
            .catch(function (err) {
            res.send(err);
        });
    }
};
exports.addUser = function (req, res) {
    var user = req.body;
    axios_1.default
        .post(dbUrl, user)
        .then(function () {
        res.send('Added user');
    })
        .catch(function (err) {
        res.send(err);
    });
};
exports.updateUser = function (req, res) {
    var userId = req.params.id;
    var updatedUser = req.body;
    axios_1.default
        .put(dbUrl + "/" + userId, updatedUser)
        .then(function () {
        res.send("Updated user " + userId);
    })
        .catch(function (err) {
        res.send(err);
    });
};
exports.deleteUser = function (req, res) {
    var userId = req.params.id;
    if (userId) {
        axios_1.default
            .delete(dbUrl + "/" + userId)
            .then(function () {
            res.send("Deleted user " + userId);
        })
            .catch(function (err) {
            res.send(err);
        });
    }
};
