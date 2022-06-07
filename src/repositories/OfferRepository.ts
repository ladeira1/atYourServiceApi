import { EntityRepository, Repository } from 'typeorm';
import { Offer } from '../entities/Offer';

@EntityRepository(Offer)
class OfferRepository extends Repository<Offer> {}

export { OfferRepository };
