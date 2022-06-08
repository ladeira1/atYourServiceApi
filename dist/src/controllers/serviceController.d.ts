import { Request, Response } from 'express';
declare class ServiceController {
    list(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    find(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export { ServiceController };
