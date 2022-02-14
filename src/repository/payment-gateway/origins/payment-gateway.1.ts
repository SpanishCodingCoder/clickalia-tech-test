import PaymentGatewayBase from "./payment-gateway.base";
import PaymentGateway from "../payment-gateway.origin.interface";
import Payment from "../../../model/payment.model";
import Reimbursement from "../../../model/reimbursement.model";

export default class PaymentGateway1 extends PaymentGatewayBase implements PaymentGateway {    
    pay(payment:Payment) : Payment {
        // Aquí iría lógica de negocio, usando el objeto .dummyBusinessLogic
        // heredado del padre
        payment.completed = true;
        return payment;        
    }

    // Devolvemos el reembolso con .completed a true
    reimburse(reimbursement:Reimbursement) : Reimbursement {
        // Aquí iría lógica de negocio, usando el objeto .dummyBusinessLogic
        // heredado del padre
        reimbursement.completed = true;
        return reimbursement;
    }
}