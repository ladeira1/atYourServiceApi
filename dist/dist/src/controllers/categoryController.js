"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const typeorm_1 = require("typeorm");
const category_1 = require("../errors/category");
const CategoryRepository_1 = require("../repositories/CategoryRepository");
const categoryView_1 = require("../views/categoryView");
class CategoryController {
    async find(req, res) {
        try {
            const { id } = req.params;
            const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
            const category = await categoryRepository.findOne({ id });
            if (!category) {
                return res
                    .status(422)
                    .json(categoryView_1.CategoryView.manyErrors(category_1.CategoryErrors.NOT_FOUND));
            }
            res.status(200).json(categoryView_1.CategoryView.returnCategory(category));
        }
        catch (err) {
            res.status(401).json(categoryView_1.CategoryView.manyErrors(err));
        }
    }
    async list(req, res) {
        try {
            const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
            const category = await categoryRepository.find();
            if (!category) {
                return res
                    .status(400)
                    .json(categoryView_1.CategoryView.manyErrors(category_1.CategoryErrors.NOT_FOUND));
            }
            res.status(200).json(categoryView_1.CategoryView.returnMany(category));
        }
        catch (err) {
            res.status(401).json(categoryView_1.CategoryView.manyErrors(err));
        }
    }
    async create(req, res) {
        try {
            const { name } = req.body;
            const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
            const category = categoryRepository.create({
                name,
            });
            await categoryRepository.save(category);
            res.status(201).json(categoryView_1.CategoryView.returnCategory(category));
        }
        catch (err) {
            res.status(401).json(categoryView_1.CategoryView.manyErrors(err));
        }
    }
    async update(req, res) {
        try {
            const { body: { name }, params: { id }, } = req;
            const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
            const category = await categoryRepository.findOne({ id });
            category.name = name;
            await categoryRepository.save(category);
            return res.status(200).json(categoryView_1.CategoryView.returnCategory(category));
        }
        catch (err) {
            res.status(401).json(categoryView_1.CategoryView.manyErrors(err));
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const categoryRepository = (0, typeorm_1.getCustomRepository)(CategoryRepository_1.CategoryRepository);
            const category = await categoryRepository.findOne({ id });
            await categoryRepository.remove(category);
            return res.status(204).send();
        }
        catch (err) {
            res.status(401).json(categoryView_1.CategoryView.manyErrors(err));
        }
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=categoryController.js.map