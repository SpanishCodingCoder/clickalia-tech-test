import {
    paymentGatewayDataOriginsMap,
    paymentGatewayDataOriginsKeys,
    paymentGatewayDataOriginsTypes    
} from './payment-gateway.origin.types';

import { ExtractInstanceType } from '../../tools/exports.project';

// Lo que deberíamos es tener la FACTORÍA de servicios importada.
import PaymentService from '../../service/payment.service';

// La factoría devolverá una gateway en función de lo que se le pida (1,2,3)
export default class PaymentGatewayFactory {
    public static getPaymentGateway(key: paymentGatewayDataOriginsKeys, service: PaymentService) : ExtractInstanceType<paymentGatewayDataOriginsTypes> {
        return new paymentGatewayDataOriginsMap[key](service);
    }
}

