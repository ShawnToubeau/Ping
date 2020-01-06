"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("./routes"));
var port = 4000;
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/users', routes_1.default.user);
app.get('/', function (req, res) {
    res.send('Hello world');
});
app.listen(port, function () {
    console.log("Server listening on " + port);
});
