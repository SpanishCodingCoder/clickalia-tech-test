// Importamos los orígenes de datos para la factoría
import PaymentGateway1 from "./origins/payment-gateway.1";
import PaymentGateway2 from "./origins/payment-gateway.2";
import PaymentGateway3 from "./origins/payment-gateway.3";

// Las claves podrían ser strings también
export const paymentGatewayDataOriginsMap = {
    1: PaymentGateway1,
    2: PaymentGateway2,
    3: PaymentGateway3
};

// Estas claves (1 | 2 | 3) nos van a servir para, en configuración, definir la pasarela de pago.
export type paymentGatewayDataOriginsKeys = keyof typeof paymentGatewayDataOriginsMap;

// Aquí tenemos los tipos para la factoría
export type paymentGatewayDataOriginsTypes = typeof paymentGatewayDataOriginsMap[paymentGatewayDataOriginsKeys];
