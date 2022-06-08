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
exports.OfferView = void 0;
var defaultView_1 = require("./defaultView");
var serviceView_1 = require("./serviceView");
var userView_1 = require("./userView");
var OfferView = (function (_super) {
    __extends(OfferView, _super);
    function OfferView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OfferView.returnOffer = function (offer, withUser) {
        if (withUser === void 0) {
            withUser = true;
        }
        if (withUser && !!(offer === null || offer === void 0 ? void 0 : offer.user)) {
            return __assign(__assign(__assign({ id: offer.id, message: offer.message, status: offer.status, title: offer.title }, userView_1.UserView.returnUser(offer.user, false)), serviceView_1.ServiceView.returnService(offer.service)), { createdAt: offer.createdAt, updatedAt: offer.updatedAt, value: offer.value });
        }
        return __assign(__assign({ id: offer.id, message: offer.message, status: offer.status, title: offer.title }, serviceView_1.ServiceView.returnService(offer.service)), { createdAt: offer.createdAt, updatedAt: offer.updatedAt, value: offer.value });
    };
    OfferView.returnMany = function (offers) {
        var _this = this;
        return offers.map(function (offer) { return _this.returnOffer(offer, false); });
    };
    return OfferView;
}(defaultView_1.DefaultView));
exports.OfferView = OfferView;
//# sourceMappingURL=offerView.js.map