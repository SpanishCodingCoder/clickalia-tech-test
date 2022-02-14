import { Router, Response } from 'express';
import { TypedRequestBody } from '../tools/exports.project';
import Controller from './controller.interface';
import Payment from '../model/payment.model';
import PaymentGateway from '../repository/payment-gateway/payment-gateway.origin.interface';

// Clase controlador de pagos
// Ruta /payment
export default class PaymentController implements Controller {
  public path = '/payment';
  public router = Router();
  private payGate: PaymentGateway;

  constructor(gateway: PaymentGateway) {
    this.payGate = gateway;
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(this.path, this.makePayment.bind(this));
  }

  private validate(request: TypedRequestBody<Payment>): boolean {
    /**
     * Deberíamos usar estas librerías, pero para el test nos vale con esta simple comprobación
     * import { validate, Matches, IsDefined } from "class-validator";
     * import { plainToClass, Expose } from "class-transformer";
     */
    return (request.body.amount > 0) ? true : false;
  }

  public makePayment(request: TypedRequestBody<Payment>, res: Response) {
    if (!this.validate(request)) {
      res.status(400).json({ "invalid": true });
    } else {
      const payCompleted = this.payGate.pay(request.body);
      res.status(200).json(payCompleted);
    }
  }
}
