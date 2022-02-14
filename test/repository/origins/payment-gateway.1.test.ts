import 'jest';
import * as dotenv from 'dotenv';
import PaymentGateway1 from '../../../src/repository/payment-gateway/origins/payment-gateway.1';
import Payment from '../../../src/model/payment.model';
import Reimbursement from '../../../src/model/reimbursement.model';

// Quedarían los tests de las otras gateways, pero para el test creo que esto es suficiente, serían muy similares
describe('PaymentGateway1 test', () => {

    it('Ejecuta el método pay correctamente', () => {
        const payment = <Payment> {
            completed: false,
            customer: 1,
            currency: 'USD',
            amount: 200            
        };
        const gateway = new PaymentGateway1({});
        const newPayment = gateway.pay(payment);
        expect(newPayment.completed).toBe(true);
    });

    it('Ejecuta el método reimburse corrctamente', () => {
        const reimburse = <Reimbursement> {
            completed: false,
            customer: 1,
            currency: 'USD',
            amount: 200            
        };
        const gateway = new PaymentGateway1({});
        const newReimburse = gateway.reimburse(reimburse);
        expect(newReimburse.completed).toBe(true);
    });

});