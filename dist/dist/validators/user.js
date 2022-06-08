"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
var typeorm_1 = require("typeorm");
var Yup = __importStar(require("yup"));
var user_1 = require("../errors/user");
var UserRepository_1 = require("../repositories/UserRepository");
var userView_1 = require("../views/userView");
var UserValidator = (function () {
    function UserValidator() {
    }
    UserValidator.prototype.get = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, validation, userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            id: Yup.string().required(user_1.UserErrors.ACCOUNT_NOT_FOUND),
                        });
                        return [4, schema.isValid(req.params)];
                    case 1:
                        if (!!(_a.sent()))
                            return [3, 3];
                        return [4, schema
                                .validate(req.body, {
                                abortEarly: false,
                            })
                                .catch(function (err) {
                                var errors = err.errors.map(function (message) {
                                    return message;
                                });
                                return errors;
                            })];
                    case 2:
                        validation = _a.sent();
                        return [2, res.status(401).json(userView_1.UserView.manyErrors(validation))];
                    case 3:
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4, userRepository.findOne({ id: req.params.id })];
                    case 4:
                        user = _a.sent();
                        if (!user) {
                            return [2, res
                                    .status(401)
                                    .json(userView_1.UserView.manyErrors(user_1.UserErrors.ACCOUNT_NOT_FOUND))];
                        }
                        next();
                        return [2];
                }
            });
        });
    };
    UserValidator.prototype.createAccount = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, validation, userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            name: Yup.string().required(user_1.UserErrors.REQUIRED_NAME),
                            email: Yup.string().email().required(user_1.UserErrors.REQUIRED_EMAIL),
                            city: Yup.string().required(user_1.UserErrors.REQUIRED_CITY),
                            password: Yup.string()
                                .required(user_1.UserErrors.REQUIRED_PASSWORD)
                                .min(6, user_1.UserErrors.INVALID_PASSWORD),
                            passwordConfirmation: Yup.string()
                                .required(user_1.UserErrors.REQUIRED_PASSWORD_CONFIRMATION)
                                .min(6, user_1.UserErrors.INVALID_PASSWORD_CONFIRMATION)
                                .oneOf([Yup.ref('password')], user_1.UserErrors.INVALID_PASSWORD_CONFIRMATION),
                        });
                        return [4, schema.isValid(req.body)];
                    case 1:
                        if (!!(_a.sent()))
                            return [3, 3];
                        return [4, schema
                                .validate(req.body, {
                                abortEarly: false,
                            })
                                .catch(function (err) {
                                var errors = err.errors.map(function (message) {
                                    return message;
                                });
                                return errors;
                            })];
                    case 2:
                        validation = _a.sent();
                        return [2, res.status(401).json(userView_1.UserView.manyErrors(validation))];
                    case 3:
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4, userRepository.findOne({ email: req.body.email })];
                    case 4:
                        user = _a.sent();
                        if (user) {
                            return [2, res
                                    .status(401)
                                    .json(userView_1.UserView.manyErrors(user_1.UserErrors.EMAIL_ALREADY_IN_USE))];
                        }
                        next();
                        return [2];
                }
            });
        });
    };
    UserValidator.prototype.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, validation, userRepository, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            email: Yup.string()
                                .email(user_1.UserErrors.INVALID_EMAIL)
                                .required(user_1.UserErrors.REQUIRED_EMAIL),
                            password: Yup.string()
                                .required(user_1.UserErrors.REQUIRED_PASSWORD)
                                .min(6, user_1.UserErrors.INVALID_PASSWORD),
                        });
                        return [4, schema.isValid(req.body)];
                    case 1:
                        if (!!(_a.sent()))
                            return [3, 3];
                        return [4, schema
                                .validate(req.body, {
                                abortEarly: false,
                            })
                                .catch(function (err) {
                                var errors = err.errors.map(function (message) {
                                    return message;
                                });
                                return errors;
                            })];
                    case 2:
                        validation = _a.sent();
                        return [2, res.status(401).json(userView_1.UserView.manyErrors(validation))];
                    case 3:
                        userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
                        return [4, userRepository.findOne({ email: req.body.email })];
                    case 4:
                        user = _a.sent();
                        if (!user) {
                            return [2, res
                                    .status(401)
                                    .json(userView_1.UserView.manyErrors(user_1.UserErrors.ACCOUNT_NOT_FOUND))];
                        }
                        next();
                        return [2];
                }
            });
        });
    };
    UserValidator.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, validation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            name: Yup.string().required(user_1.UserErrors.REQUIRED_NAME),
                            password: Yup.string()
                                .required(user_1.UserErrors.REQUIRED_PASSWORD)
                                .min(6, user_1.UserErrors.INVALID_PASSWORD),
                        });
                        return [4, schema.isValid(req.body)];
                    case 1:
                        if (!!(_a.sent()))
                            return [3, 3];
                        return [4, schema
                                .validate(req.body, {
                                abortEarly: false,
                            })
                                .catch(function (err) {
                                var errors = err.errors.map(function (message) {
                                    return message;
                                });
                                return errors;
                            })];
                    case 2:
                        validation = _a.sent();
                        return [2, res.status(401).json(userView_1.UserView.manyErrors(validation))];
                    case 3:
                        next();
                        return [2];
                }
            });
        });
    };
    UserValidator.prototype.updatePassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var schema, validation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        schema = Yup.object().shape({
                            oldPassword: Yup.string()
                                .required(user_1.UserErrors.REQUIRED_PASSWORD)
                                .min(6, user_1.UserErrors.INVALID_PASSWORD),
                            password: Yup.string()
                                .required(user_1.UserErrors.REQUIRED_PASSWORD)
                                .min(6, user_1.UserErrors.INVALID_PASSWORD),
                            passwordConfirmation: Yup.string()
                                .required(user_1.UserErrors.REQUIRED_PASSWORD_CONFIRMATION)
                                .min(6, user_1.UserErrors.INVALID_PASSWORD_CONFIRMATION)
                                .oneOf([Yup.ref('password')], user_1.UserErrors.INVALID_PASSWORD_CONFIRMATION),
                        });
                        return [4, schema.isValid(req.body)];
                    case 1:
                        if (!!(_a.sent()))
                            return [3, 3];
                        return [4, schema
                                .validate(req.body, {
                                abortEarly: false,
                            })
                                .catch(function (err) {
                                var errors = err.errors.map(function (message) {
                                    return message;
                                });
                                return errors;
                            })];
                    case 2:
                        validation = _a.sent();
                        return [2, res.status(401).json(userView_1.UserView.manyErrors(validation))];
                    case 3:
                        next();
                        return [2];
                }
            });
        });
    };
    return UserValidator;
}());
exports.UserValidator = UserValidator;
//# sourceMappingURL=user.js.map