import { EntityRepository, Repository } from 'typeorm';
import { Image } from '../entities/Image';

@EntityRepository(Image)
class ImageRepository extends Repository<Image> {}

export { ImageRepository };
