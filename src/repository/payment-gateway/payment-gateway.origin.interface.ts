import Payment from "../../model/payment.model";
import Reimbursement from "../../model/reimbursement.model";

// Todas las pasarelas de pago deben conformarse a esta interfaz
export default interface PaymentGateway {
    pay(payment:Payment) : Payment
    reimburse(reimbursement:Reimbursement): Reimbursement
}