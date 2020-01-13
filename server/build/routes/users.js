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
var jsonServer = __importStar(require("../controllers/userJsonServer"));
var router = express_1.Router();
// GET: all users
router.get('/users', jsonServer.getAllUsers);
// GET: single user
router.get('/users/:id', jsonServer.getUser);
// POST: add user
router.post('/users', jsonServer.validate('addUser'), jsonServer.addUser);
// PUT: update user
router.put('/users/:id', jsonServer.validate('updateUser'), jsonServer.updateUser);
// DELETE: remove user
router.delete('/users/:id', jsonServer.deleteUser);
exports.default = router;
