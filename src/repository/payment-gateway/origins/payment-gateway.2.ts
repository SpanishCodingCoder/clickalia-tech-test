import PaymentGatewayBase from "./payment-gateway.base";
import PaymentGateway from "../payment-gateway.origin.interface";
import Payment from "../../../model/payment.model";
import Reimbursement from "../../../model/reimbursement.model";

export default class PaymentGateway2 extends PaymentGatewayBase implements PaymentGateway {
    // Este método es propio de esta clase
    // Tener métodos que no están dentro de la interfaz NO es una buena idea en TS
    // Cualquier objeto que use este no sabe que tiene este método acorde a la interfaz PaymentGateway
    // Ni tampoco a la clase base de la que hereda PaymentGatewayBase
    // La factoría lo puede devolver porque implementa la interfaz de la clase base  
    // Debería ser privado
    // Si hay que exponerlo hacia fuera, debería estar tipado en una interfaz   
    partialReimburse(payment:Payment, reimburse: Reimbursement) : Reimbursement {
        reimburse.amount -= payment.amount;
        if(reimburse.amount < 0 ) {
            reimburse.completed = true;
        }
        return reimburse;
    }

    pay(payment:Payment) : Payment {
        // Aquí iría lógica de negocio, usando el objeto .dummyBusinessLogic
        // heredado del padre        
        payment.completed = true;
        payment.currency = 'USD';
        payment.customer = 1;
        return payment;        
    }

    // Devolvemos el reembolso con .completed a true
    reimburse(reimbursement:Reimbursement) : Reimbursement {
        // Aquí iría lógica de negocio, usando el objeto .dummyBusinessLogic
        // heredado del padre
        reimbursement.completed = true;
        reimbursement.currency = 'USD';
        reimbursement.customer = 1;
        return reimbursement;
    }
}