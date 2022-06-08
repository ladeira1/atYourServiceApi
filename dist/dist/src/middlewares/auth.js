"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../config/auth"));
const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(400).json({ error: 'Token not found' });
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
        return res.status(401).json({ error: 'Token does not match Bearer' });
    }
    if (!token || token === '') {
        return res.status(401).json({ error: 'Invalid token' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, auth_1.default.secret, (err, verifiedJwt) => {
            return err ? new Error('Invalid token') : verifiedJwt;
        });
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map