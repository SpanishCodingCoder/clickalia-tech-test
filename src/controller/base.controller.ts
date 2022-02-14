import { Router, Request, Response } from 'express';
import Controller from './controller.interface';

// Controlador base, devuelve ok para indicar que la app escucha
export default class BaseController implements Controller {
    public path = '/';
    public router = Router();    

    constructor() {        
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/', (req: Request, res: Response) => {
            res.status(200).json({"ok": true});
        })
    }    
}
