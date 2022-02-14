import PaymentGatewayBase from "./payment-gateway.base";
import PaymentGateway from "../payment-gateway.origin.interface";
import Payment from "../../../model/payment.model";
import Reimbursement from "../../../model/reimbursement.model";

export default class PaymentGateway3 extends PaymentGatewayBase implements PaymentGateway {
    // Este puede devolver uno o varios tipos
    // Ver PaymentGateway2 para más info
    uniqueMethod(payment:Payment, reimburse: Reimbursement) : Payment | Reimbursement {
        if(payment.amount > reimburse.amount) {
            return payment;
        } else {
            return reimburse;
        }
    }

    pay(payment:Payment) : Payment {
        // Aquí iría lógica de negocio, usando el objeto .dummyBusinessLogic
        // heredado del padre
        payment.completed = true;
        payment.currency = 'EUR';
        payment.customer = 2;
        return payment;        
    }

    // Devolvemos el reembolso con .completed a true
    reimburse(reimbursement:Reimbursement) : Reimbursement {
        // Aquí iría lógica de negocio, usando el objeto .dummyBusinessLogic
        // heredado del padre
        reimbursement.completed = true;
        reimbursement.currency = 'EUR';
        reimbursement.customer = 2;
        return reimbursement;
    }
}