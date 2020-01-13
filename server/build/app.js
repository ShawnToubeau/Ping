"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
// Route imports
var users_1 = __importDefault(require("./routes/users"));
var index_1 = __importDefault(require("./routes/index"));
var app = express_1.default();
// DB Config
var keys_1 = __importDefault(require("./config/keys"));
// Connect to Mongo
mongoose_1.default
    .connect(keys_1.default.MongoURI, { useNewUrlParser: true })
    .then(function () { return console.log('MongoDB connected...'); })
    .catch(function (err) { return console.error(err); });
// Middleware
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(expressValidator());
app.use(express_ejs_layouts_1.default);
// Routes
app.use(users_1.default);
app.use(index_1.default);
var PORT = process.env.PORT || 4000;
app.listen(PORT, function () { return console.log("Server listening on " + PORT); });
