"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_1 = __importDefault(require("../config/auth"));
var getToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, auth_1.default.secret, {
        expiresIn: auth_1.default.expiresIn,
    });
};
exports.getToken = getToken;
