import { Request, Response } from 'express';
declare class OfferController {
    get(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    listByWorker(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    listByUser(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    complete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    acceptOrRefuse(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export { OfferController };
