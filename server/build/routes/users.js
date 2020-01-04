"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send("\n      <form method=\"POST\">\n        <div>\n          <label>Email</label>\n          <input name=\"email\" />\n        </div>\n        <div>\n          <label>Password</label>\n          <input name=\"password\" type=\"password\"/>\n        </div>\n        <button>Submit</button>\n      </form>\n    ");
});
router.post('/', function (req, res) {
    // const { email, password } = req.body;
    // console.log(email, password);
    console.log(req.body);
});
exports.default = router;
