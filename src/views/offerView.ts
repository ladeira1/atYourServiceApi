import { Offer } from '../entities/Offer';
import { DefaultView } from './defaultView';
import { ServiceView } from './serviceView';
import { UserView } from './userView';

export class OfferView extends DefaultView {
  static returnOffer(offer: Offer, withUser = true) {
    if (withUser && !!offer?.user) {
      return {
        id: offer.id,
        message: offer.message,
        status: offer.status,
        title: offer.title,
        ...UserView.returnUser(offer.user, false),
        ...ServiceView.returnService(offer.service),
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
      ...ServiceView.returnService(offer.service),
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
      value: offer.value,
    };
  }

  static returnMany(offers: Offer[]) {
    return offers.map(offer => this.returnOffer(offer, false));
  }
}
