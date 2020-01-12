"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var Users_1 = __importDefault(require("../models/Users"));
var router = express_1.Router();
// Login
router.get('/login', function (req, res) {
    res.send('Login');
});
// Register
router.get('/register', function (req, res) {
    res.send('Register');
});
// Register user
router.post('/register', function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email, password = _a.password;
    //TODO:(Shawn) add field validation
    var newUser = new Users_1.default({
        name: name,
        email: email,
        password: password
    });
    // Hash password
    bcryptjs_1.default.genSalt(10, function (err, salt) {
        return bcryptjs_1.default.hash(newUser.password, salt, function (err, hash) {
            if (err)
                throw err;
            newUser.password = hash;
            newUser
                .save()
                .then(function (user) {
                res.redirect('/login');
            })
                .catch(function (err) { return console.error(err); });
        });
    });
});
exports.default = router;
