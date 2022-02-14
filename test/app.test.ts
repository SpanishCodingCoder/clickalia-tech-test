import 'jest';
import Application from '../src/app';
import * as dotenv from 'dotenv';
import applicationConfig from '../application.config';
import * as superAgent from "superagent";

import BaseController from '../src/controller/base.controller';
import PaymentController from '../src/controller/payment.controller';
import ReimbursementController from '../src/controller/reimbursement.controller';

import PaymentGatewayFactory from '../src/repository/payment-gateway/payment-gateway.factory';

import Payment from '../src/model/payment.model';
import Reimbursement from '../src/model/reimbursement.model';

describe('Application unit test', () => {

    beforeEach(() => {
        dotenv.config();    
        applicationConfig.dev = false;    
        applicationConfig.port = 5556;        
    });

    it('Me devuelve un status 404 si no le paso el header correcto', async () => {
        const baseRoute = new BaseController();
        const myApplicaton = new Application([baseRoute], applicationConfig.port);        
        try {
            const response = await superAgent.get(`http://localhost:${applicationConfig.port}/`);
            expect(response.status).toBe(404);
        } catch (e) {
            // console.log(e);
        }
        myApplicaton.teardown();
    });

    it('Me devuelve un status 200 si le paso el header correcto', async() => {
        const baseRoute = new BaseController();
        const myApplicaton = new Application([baseRoute], applicationConfig.port);        
        try {
            const response = await superAgent.get(`http://localhost:${applicationConfig.port}/`).set('Authorization', '1234');
            expect(response.status).toBe(200);
        } catch (e) {
            // console.log(e);
        }
        myApplicaton.teardown();
    });

    it('Me devuelve el pago correctamente procesado', async() => {
        const payRoute = new PaymentController(PaymentGatewayFactory.getPaymentGateway(1, {}));
        const myApplicaton = new Application([payRoute], applicationConfig.port);
        try {
            // El cuerpo puede ser JSON
            const payment = {
                amount: 200
            };
            const response = await superAgent.post(`http://localhost:${applicationConfig.port}/payment`).set('Authorization', '1234').send(payment);
            expect(response.status).toBe(200);
            const newPayment = <Payment>response.body;
            expect(newPayment.completed).toBe(true);
        } catch (e) {
            // console.log(e);
        }
        myApplicaton.teardown();
    });

    it('Me devuelve correctamente el reembolso procesado', async() => {
        const reimburseRoute = new ReimbursementController(PaymentGatewayFactory.getPaymentGateway(1, {}));
        const myApplicaton = new Application([reimburseRoute], applicationConfig.port);
        try {
            const reimburse = {
                amount: 200
            };
            const response = await superAgent.post(`http://localhost:${applicationConfig.port}/reimburse`).set('Authorization', '1234').send(reimburse);
            expect(response.status).toBe(200);
            const newReimburse = <Reimbursement>response.body;
            expect(newReimburse.completed).toBe(true);
        } catch (e) {
            // console.log(e);
        }
        myApplicaton.teardown();
    });

});