"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserView = void 0;
const getToken_1 = require("../utils/getToken");
const defaultView_1 = require("./defaultView");
class UserView extends defaultView_1.DefaultView {
    static returnUser(user, withToken = true) {
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
    }
}
exports.UserView = UserView;
