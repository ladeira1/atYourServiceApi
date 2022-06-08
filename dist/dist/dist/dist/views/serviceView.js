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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceView = void 0;
var categoryView_1 = require("./categoryView");
var defaultView_1 = require("./defaultView");
var workerView_1 = require("./workerView");
var ServiceView = (function (_super) {
    __extends(ServiceView, _super);
    function ServiceView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServiceView.returnService = function (service) {
        var _a;
        return {
            service: __assign(__assign({ id: service.id, name: service.name, minValue: service.minValue, thumbsUp: service.thumbsUp, timesProvided: service.timesProvided, description: service.description, images: (_a = service === null || service === void 0 ? void 0 : service.images) !== null && _a !== void 0 ? _a : [], createdAt: service.createdAt, updatedAt: service.updatedAt }, categoryView_1.CategoryView.returnCategory(service.category)), workerView_1.WorkerView.returnWorker(service.worker)),
        };
    };
    ServiceView.returnMany = function (services) {
        var _this = this;
        return services.map(function (service) { return _this.returnService(service); });
    };
    return ServiceView;
}(defaultView_1.DefaultView));
exports.ServiceView = ServiceView;
//# sourceMappingURL=serviceView.js.map