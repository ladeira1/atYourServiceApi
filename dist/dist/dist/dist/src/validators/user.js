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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const typeorm_1 = require("typeorm");
const Yup = __importStar(require("yup"));
const user_1 = require("../errors/user");
const UserRepository_1 = require("../repositories/UserRepository");
const userView_1 = require("../views/userView");
class UserValidator {
    async get(req, res, next) {
        const schema = Yup.object().shape({
            id: Yup.string().required(user_1.UserErrors.ACCOUNT_NOT_FOUND),
        });
        if (!(await schema.isValid(req.params))) {
            const validation = await schema
                .validate(req.body, {
                abortEarly: false,
            })
                .catch(err => {
                const errors = err.errors.map((message) => {
                    return message;
                });
                return errors;
            });
            return res.status(401).json(userView_1.UserView.manyErrors(validation));
        }
        const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const user = await userRepository.findOne({ id: req.params.id });
        if (!user) {
            return res
                .status(401)
                .json(userView_1.UserView.manyErrors(user_1.UserErrors.ACCOUNT_NOT_FOUND));
        }
        next();
    }
    async createAccount(req, res, next) {
        const schema = Yup.object().shape({
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
        if (!(await schema.isValid(req.body))) {
            const validation = await schema
                .validate(req.body, {
                abortEarly: false,
            })
                .catch(err => {
                const errors = err.errors.map((message) => {
                    return message;
                });
                return errors;
            });
            return res.status(401).json(userView_1.UserView.manyErrors(validation));
        }
        const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const user = await userRepository.findOne({ email: req.body.email });
        if (user) {
            return res
                .status(401)
                .json(userView_1.UserView.manyErrors(user_1.UserErrors.EMAIL_ALREADY_IN_USE));
        }
        next();
    }
    async login(req, res, next) {
        const schema = Yup.object().shape({
            email: Yup.string()
                .email(user_1.UserErrors.INVALID_EMAIL)
                .required(user_1.UserErrors.REQUIRED_EMAIL),
            password: Yup.string()
                .required(user_1.UserErrors.REQUIRED_PASSWORD)
                .min(6, user_1.UserErrors.INVALID_PASSWORD),
        });
        if (!(await schema.isValid(req.body))) {
            const validation = await schema
                .validate(req.body, {
                abortEarly: false,
            })
                .catch(err => {
                const errors = err.errors.map((message) => {
                    return message;
                });
                return errors;
            });
            return res.status(401).json(userView_1.UserView.manyErrors(validation));
        }
        const userRepository = (0, typeorm_1.getCustomRepository)(UserRepository_1.UserRepository);
        const user = await userRepository.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(401)
                .json(userView_1.UserView.manyErrors(user_1.UserErrors.ACCOUNT_NOT_FOUND));
        }
        next();
    }
    async update(req, res, next) {
        const schema = Yup.object().shape({
            name: Yup.string().required(user_1.UserErrors.REQUIRED_NAME),
            password: Yup.string()
                .required(user_1.UserErrors.REQUIRED_PASSWORD)
                .min(6, user_1.UserErrors.INVALID_PASSWORD),
        });
        if (!(await schema.isValid(req.body))) {
            const validation = await schema
                .validate(req.body, {
                abortEarly: false,
            })
                .catch(err => {
                const errors = err.errors.map((message) => {
                    return message;
                });
                return errors;
            });
            return res.status(401).json(userView_1.UserView.manyErrors(validation));
        }
        next();
    }
    async updatePassword(req, res, next) {
        const schema = Yup.object().shape({
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
        if (!(await schema.isValid(req.body))) {
            const validation = await schema
                .validate(req.body, {
                abortEarly: false,
            })
                .catch(err => {
                const errors = err.errors.map((message) => {
                    return message;
                });
                return errors;
            });
            return res.status(401).json(userView_1.UserView.manyErrors(validation));
        }
        next();
    }
}
exports.UserValidator = UserValidator;
//# sourceMappingURL=user.js.map