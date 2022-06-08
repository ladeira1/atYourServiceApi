import { Request, Response } from 'express';
declare class WorkerController {
    find(id: string): Promise<import("../entities/Worker").Worker | null>;
    create(req: Request, res: Response): Promise<void>;
}
export { WorkerController };
