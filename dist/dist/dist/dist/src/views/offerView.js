"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferView = void 0;
const defaultView_1 = require("./defaultView");
const serviceView_1 = require("./serviceView");
const userView_1 = require("./userView");
class OfferView extends defaultView_1.DefaultView {
    static returnOffer(offer, withUser = true) {
        if (withUser && !!offer?.user) {
            return {
                id: offer.id,
                message: offer.message,
                status: offer.status,
                title: offer.title,
                ...userView_1.UserView.returnUser(offer.user, false),
                ...serviceView_1.ServiceView.returnService(offer.service),
                createdAt: offer.createdAt,
                updatedAt: offer.updatedAt,
                value: offer.value,
            };
        }
        return {
            id: offer.id,
            message: offer.message,
            status: offer.status,
            title: offer.title,
            ...serviceView_1.ServiceView.returnService(offer.service),
            createdAt: offer.createdAt,
            updatedAt: offer.updatedAt,
            value: offer.value,
        };
    }
    static returnMany(offers) {
        return offers.map(offer => this.returnOffer(offer, false));
    }
}
exports.OfferView = OfferView;
//# sourceMappingURL=offerView.js.map