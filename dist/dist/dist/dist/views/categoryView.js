"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) {
                for (var p in b)
                    if (Object.prototype.hasOwnProperty.call(b, p))
                        d[p] = b[p];
            };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryView = void 0;
var defaultView_1 = require("./defaultView");
var CategoryView = (function (_super) {
    __extends(CategoryView, _super);
    function CategoryView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoryView.returnCategory = function (category) {
        return {
            category: category,
        };
    };
    CategoryView.returnMany = function (categories) {
        var _this = this;
        return categories.map(function (category) { return _this.returnCategory(category); });
    };
    return CategoryView;
}(defaultView_1.DefaultView));
exports.CategoryView = CategoryView;
//# sourceMappingURL=categoryView.js.map