"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
require("./database");
var cors_1 = __importDefault(require("cors"));
var routes_1 = require("./routes");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(routes_1.router);
exports.app.listen(3333, function () {
    console.log('Server running on port 3333');
});
