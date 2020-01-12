"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jsonServer = __importStar(require("../databases/jsonServer"));
var router = express_1.Router();
// Middlewares
function validateBody(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(422).send("Missing property \"" + key + "\"");
                return;
            }
        }
        next();
    };
}
// GET: all users
router.get('/users', jsonServer.getAllUsers);
// GET: single user
router.get('/users/:id', jsonServer.getUser);
// POST: add user
router.post('/users', validateBody(['name', 'email']), jsonServer.addUser);
// PUT: update user
router.put('/users/:id', validateBody(['name', 'email']), jsonServer.updateUser);
// DELETE: remove user
router.delete('/users/:id', jsonServer.deleteUser);
exports.default = router;
