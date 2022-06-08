"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultView = void 0;
var DefaultView = (function () {
    function DefaultView() {
    }
    DefaultView.success = function (message) {
        return { success: message };
    };
    DefaultView.error = function (error) {
        return { error: error };
    };
    DefaultView.manyErrors = function (messages) {
        if (Array.isArray(messages)) {
            return {
                error: messages.map(function (message) { return message; }),
            };
        }
        return { error: messages };
    };
    return DefaultView;
}());
exports.DefaultView = DefaultView;
//# sourceMappingURL=defaultView.js.map