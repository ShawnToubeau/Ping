"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var ApiSync = /** @class */ (function () {
    function ApiSync(rootUrl) {
        this.rootUrl = rootUrl;
    }
    ApiSync.prototype.fetch = function (id) {
        var getUrl = this.rootUrl + "/" + id;
        return axios_1.default.get(getUrl);
    };
    ApiSync.prototype.save = function (data) {
        var id = data.id;
        if (id) {
            var putUrl = this.rootUrl + "/" + id;
            return axios_1.default.put(putUrl, data);
        }
        else {
            var postUrl = "" + this.rootUrl;
            return axios_1.default.post(postUrl, data);
        }
    };
    return ApiSync;
}());
exports.ApiSync = ApiSync;
