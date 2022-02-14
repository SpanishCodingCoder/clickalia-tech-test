import { Router, Response } from 'express';
import { TypedRequestBody } from '../tools/exports.project';
import Controller from './controller.interface';
import Reimbursement from '../model/payment.model';
import PaymentGateway from '../repository/payment-gateway/payment-gateway.origin.interface';

// Clase controlador de reembolsos
// Ruta /reimbursement
export default class ReimbursementController implements Controller {
    public path = '/reimburse';
    public router = Router();
    private payGate: PaymentGateway;

    constructor(gateway:PaymentGateway) {
        this.payGate = gateway;
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(this.path, this.makeReimburse.bind(this));
    }

    private validate(request: TypedRequestBody<Reimbursement>) : boolean {
        return (request.body.amount > 0) ? true : false;
      }

    private makeReimburse(request: TypedRequestBody<Reimbursement>, res: Response) {
        if(!this.validate(request)) {
            res.status(400).json({"invalid": true});
        } else {
            const payCompleted = this.payGate.pay(request.body);
            res.status(200).json(payCompleted);
        }
    }
}
