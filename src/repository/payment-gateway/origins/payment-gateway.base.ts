import PaymentService from "../../../service/payment.service";

// Esta es la clase base de pagos.
// Se asume que la gestión de lógica de negocio debería salir de una factoría
export default class PaymentGatewayBase {

    // Objeto de lógica de negocio (no hace nada)
    // Debería venir de una factoría
    dummyBusinessLogic: PaymentService | undefined;
    
    constructor(dummyBusinessLogic?:PaymentService) {
        this.dummyBusinessLogic = dummyBusinessLogic;
    }

    
}