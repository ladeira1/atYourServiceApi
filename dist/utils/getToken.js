"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
const getToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, auth_1.default.secret, {
        expiresIn: auth_1.default.expiresIn,
    });
};
exports.getToken = getToken;
