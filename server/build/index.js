"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_1 = __importDefault(require("./routes/users"));
// import passport from 'passport';
// import { Strategy } from 'passport-local';
// import session from 'express-session';
var port = 4000;
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(users_1.default);
app.get('/', function (req, res) {
    res.send('Hello world');
});
app.listen(port, function () {
    console.log("Server listening on " + port);
});
