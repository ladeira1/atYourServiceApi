"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidator = void 0;
const typeorm_1 = require("typeorm");
const Yup = __importStar(require("yup"));
const category_1 = require("../errors/category");
const user_1 = require("../errors/user");
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const categoryView_1 = require("../views/categoryView");
class CategoryValidator {
    async create(req, res, next) {
        const schema = Yup.object().shape({
            name: Yup.string().required(user_1.UserErrors.REQUIRED_NAME),
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
            return res.status(401).json(categoryView_1.CategoryView.manyErrors(validation));
        }
        const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
        const category = await categoryRepository.findOne({ name: req.body.name });
        if (category) {
            return res
                .status(401)
                .json(categoryView_1.CategoryView.manyErrors(category_1.CategoryErrors.NAME_ALREADY_IN_USE));
        }
        next();
    }
    async update(req, res, next) {
        const schema = Yup.object().shape({
            name: Yup.string().required(category_1.CategoryErrors.REQUIRED_NAME),
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
            return res.status(401).json(categoryView_1.CategoryView.manyErrors(validation));
        }
        const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
        const category = await categoryRepository.findOne({ id: req.params.id });
        if (!category) {
            return res
                .status(401)
                .json(categoryView_1.CategoryView.manyErrors(category_1.CategoryErrors.NOT_FOUND));
        }
        next();
    }
    async delete(req, res, next) {
        const schema = Yup.object().shape({
            id: Yup.number().required(category_1.CategoryErrors.REQUIRED_ID),
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
            return res.status(401).json(categoryView_1.CategoryView.manyErrors(validation));
        }
        const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
        const category = await categoryRepository.findOne({ id: req.params.id });
        if (!category) {
            return res
                .status(401)
                .json(categoryView_1.CategoryView.manyErrors(category_1.CategoryErrors.NOT_FOUND));
        }
        next();
    }
}
exports.CategoryValidator = CategoryValidator;
//# sourceMappingURL=category.js.map