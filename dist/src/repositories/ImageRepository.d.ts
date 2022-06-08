import { Repository } from 'typeorm';
import { Image } from '../entities/Image';
declare class ImageRepository extends Repository<Image> {
}
export { ImageRepository };
