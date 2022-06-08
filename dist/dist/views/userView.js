"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
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
exports.UserView = void 0;
var getToken_1 = require("../utils/getToken");
var defaultView_1 = require("./defaultView");
var UserView = (function (_super) {
    __extends(UserView, _super);
    function UserView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserView.returnUser = function (user, withToken) {
        if (withToken === void 0) {
            withToken = true;
        }
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                city: user.city,
                token: withToken && (0, getToken_1.getToken)(user.id),
            },
        };
    };
    return UserView;
}(defaultView_1.DefaultView));
exports.UserView = UserView;
//# sourceMappingURL=userView.js.map