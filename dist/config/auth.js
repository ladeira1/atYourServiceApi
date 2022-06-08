"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authConfig = {
    secret: process.env.TOKEN_SECRET,
    expiresIn: process.env.EXPIRATION_DATE,
};
exports.default = authConfig;
