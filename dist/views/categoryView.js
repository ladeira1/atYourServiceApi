"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryView = void 0;
const defaultView_1 = require("./defaultView");
class CategoryView extends defaultView_1.DefaultView {
    static returnCategory(category) {
        return {
            category,
        };
    }
    static returnMany(categories) {
        return categories.map(category => this.returnCategory(category));
    }
}
exports.CategoryView = CategoryView;
