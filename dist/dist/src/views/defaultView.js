"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultView = void 0;
class DefaultView {
    static success(message) {
        return { success: message };
    }
    static error(error) {
        return { error };
    }
    static manyErrors(messages) {
        if (Array.isArray(messages)) {
            return {
                error: messages.map(message => message),
            };
        }
        return { error: messages };
    }
}
exports.DefaultView = DefaultView;
//# sourceMappingURL=defaultView.js.map