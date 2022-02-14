import express from 'express';
import applicationConfig from '../application.config';
import { Server } from "http";
import Controller from './controller/controller.interface';
import { basicAuthMiddleware } from './middleware/basic.auth';

class Application {

    app: express.Application;
    server: Server;
    port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.middlewares();
        this.initControllers(controllers);
        this.port = port;
        this.server = this.start();
    }

    middlewares(): void {
        if (applicationConfig.dev) {
            this.app.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });
        }
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(basicAuthMiddleware);
    }

    initControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    start(): Server {
        return this.app.listen(this.port, () => {
            if (applicationConfig.dev) {
                console.log(`Server running on ${this.port}`);
            }
        });
    }

    teardown(): void {
        this.server.close();
    }
}

export default Application;
