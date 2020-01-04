"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var port = 4000;
var app = express_1.default();
app.get('/', function (req, res) {
    res.send('Hello world');
});
app.use('/users', routes_1.default.user);
app.listen(port, function () {
    console.log("Server listening on " + port);
});
