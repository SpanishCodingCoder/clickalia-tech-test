import 'jest';
import * as dotenv from 'dotenv';
import applicationConfig from '../../application.config';
import PaymentGatewayFactory from '../../src/repository/payment-gateway/payment-gateway.factory';
import PaymentGateway1 from '../../src/repository/payment-gateway/origins/payment-gateway.1';
import PaymentGateway2 from '../../src/repository/payment-gateway/origins/payment-gateway.2';
import PaymentGateway3 from '../../src/repository/payment-gateway/origins/payment-gateway.3';

describe('PaymentGateway tests', () => {    

    beforeEach(() => {
        dotenv.config();
    });    

    it('Debería devolver un objeto de tipo GatewayPayment1', () => {
        const expected = PaymentGatewayFactory.getPaymentGateway(1, {});
        expect(expected).toBeInstanceOf(PaymentGateway1);        
    });

    it('Debería devolver un objeto de tipo GatewayPayment2', () => {
        const expected = PaymentGatewayFactory.getPaymentGateway(2, {});
        expect(expected).toBeInstanceOf(PaymentGateway2);        
    });

    it('Debería devolver un objeto de tipo GatewayPayment3', () => {
        const expected = PaymentGatewayFactory.getPaymentGateway(3, {});
        expect(expected).toBeInstanceOf(PaymentGateway3);        
    });

});
