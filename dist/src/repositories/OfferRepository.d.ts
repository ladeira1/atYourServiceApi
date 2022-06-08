import { Repository } from 'typeorm';
import { Offer } from '../entities/Offer';
declare class OfferRepository extends Repository<Offer> {
}
export { OfferRepository };
