import { Offer } from '../entities/Offer';
import { DefaultView } from './defaultView';
import { ServiceView } from './serviceView';
import { UserView } from './userView';

export class OfferView extends DefaultView {
  static returnOffer(offer: Offer) {
    return {
      id: offer.id,
      message: offer.message,
      status: offer.status,
      title: offer.title,
      user: UserView.returnUser(offer.user),
      service: ServiceView.returnService(offer.service),
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
      value: offer.value,
    };
  }
}
