import { Request, Response } from 'express';
declare class UserController {
    get(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    create(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    delete(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updatePassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export { UserController };
