"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
exports.WorkerView = void 0;
var getToken_1 = require("../utils/getToken");
var defaultView_1 = require("./defaultView");
var WorkerView = /** @class */ (function (_super) {
    __extends(WorkerView, _super);
    function WorkerView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkerView.returnWorker = function (worker) {
        return {
            user: {
                id: worker.user.id,
                name: worker.user.name,
                email: worker.user.email,
                phone: worker.user.phone,
                token: (0, getToken_1.getToken)(worker.user.id),
                worker: {
                    cpfCnpj: worker.cpfCnpj,
                    address: worker.address,
                },
            },
        };
    };
    return WorkerView;
}(defaultView_1.DefaultView));
exports.WorkerView = WorkerView;
