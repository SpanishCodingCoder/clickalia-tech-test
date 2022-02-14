// Run app
import Application from './app';
import * as dotenv from 'dotenv';

// Servicios (deberían estar en su propia factoría)
import PaymentService from './service/payment.service';
import ReimbursementService from './service/reimburse.service';

// Controladores
import BaseController from './controller/base.controller';
import PaymentController from './controller/payment.controller';
import ReimbursementController from './controller/reimbursement.controller';

// Factoría repositorios
import PaymentGatewayFactory from './repository/payment-gateway/payment-gateway.factory';

// Configuración de la aplicación
import applicationConfig from '../application.config';

// Inicializamos la configuración de la aplicación
dotenv.config();

// Instanciamos los servicios
const payService = new PaymentService();
const reimburseService = new ReimbursementService();

// Instanciamos controladores
const baseController = new BaseController();

// Estos salen de la factoría, y se les inyectan los servicios
const paymentController = new PaymentController(PaymentGatewayFactory.getPaymentGateway(applicationConfig.dataOrigin, payService));
const reimburseController = new ReimbursementController(PaymentGatewayFactory.getPaymentGateway(applicationConfig.dataOrigin, reimburseService));

// La aplicación
let myApp: Application;

// Directamente se pone a correr al llamar al constructor
myApp = new Application([
    baseController,
    paymentController,
    reimburseController
], applicationConfig.port);
