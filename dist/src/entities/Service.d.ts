import { Category } from './Category';
import { Image } from './Image';
import { Offer } from './Offer';
import { Worker } from './Worker';
declare class Service {
    id: string;
    name: string;
    minValue: number;
    thumbsUp: number;
    timesProvided: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    worker: Worker;
    images: Image[];
    offers: Offer[];
}
export { Service };
