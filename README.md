# Test técnico Clikalia

# Explicación de arquitectura / componentes

La aplicación está escrita en Typescript, usando Express como librería principal.

Está dividida en las siguientes carpetas:

- controller: Contiene los controladores de las rutas
- middleware: Contiene un muy básico sistema de autentificación como middleware de express
- model: Contiene las interfaces de los modelos Payment y Reimbursement
- repository/payment-gateway: Contiene los orígenes de datos de la entidad PaymentGateway, así como sus definiciones de tipos e interfaz
- service: Contiene servicios dummy (están vacíos, pero inyectados) que se usaría para la lógica de negocio
- tools: Contiene exportaciones que vamos a usar en la aplicación en general, así como cualquier clase / función / tipo que queramos tener en el "cajón de sastre"
- test: Contiene los tests de la aplicacion (usa jest)

Asumimos por origen de datos el proveedor último de pagos / reembolsos, por ejemplo VISA, Bizum, etc...

La solución a tener diferentes orígienes de datos e integrarlos de forma sencilla es tener la siguiente arquitectura:

1.- Se define una interfaz /model/payment-gateway.origin.interface.ts
2.- Todos los orígenes de datos en /model/payment-gateway/origins heredan de la clase base PaymentGatewayBase, a la que se le inyecta el objeto de servicio,
para la gestión de lógica de negocio. Este servicio, de momento es DUMMY, pero en un entorno real, debería salir de una factoría que lo genere en función del origen de datos que se vaya a usar.
3.- Una factoría agnóstica: 
    /repository/payment-gateway/payment-gateway.origin.types.ts - Define los tipos, aquí se importan los nuevos orígenes de datos
    /repository/payment-gateway/payment-gateway.factory.ts - Factoría que genera los orígenes de datos
4.- Un fichero de configuración:
    application.config.ts
5.- Usando los tipos definidos, podemos configurar la aplicación en el fichero de configuración para que utilice uno u otro objeto de la factoría


A partir de aquí, para integrar nuevos orígenes de datos:

1.- Escribirlos implementando la interfaz
2.- Agregarlos al fichero de definiciones de tipos para la factoría

¡¡ LISTO !!


Así, tenemos en nuestro fichero de configuración (usamos dotenv):

import { paymentGatewayDataOriginsKeys } from "./src/repository/payment-gateway/payment-gateway.origin.types"

export default {
    port: 8000,
    dev: true,
    dataOrigin: <paymentGatewayDataOriginsKeys>2
}

En nuestro fichero de configuración, y estamos usando la clave 2 (literal, se puede definir como cadena también), para decirle que use el segundo origen de datos.
Cuando implementemos uno nuevo, o lo queramos cambiar, simplemente cambiamos este valor.

Para todas las factorías que implementen el modelo anteriormente descrito, esto es usable, y se puede, de esta forma, inyectar nuevos módulos de forma que no haya que tocar
apenas nada de código en las clases que vayan a usar lo que devuelven las factorías, ni tampoco en las factorías en si mismas.


# Rutas aplicación

Para todas las rutas es requerido un header de autentificación: Authentication 1234
Esto emula lo que en producción sería una auténtica securización de los endpoints.

- POST /payment

    Requiere un Request Body de tipo Payment , devuelve el mismo objeto con el campo .completed a true

- POST /reimbursement

    Requiere un Request Body de tipo Reimbursement, devuelve el mismo objeto con el campo .completed a true


# Tests

Contiene tests de las rutas, la factoría y uno de los orígenes de datos. En producción debería tener muchos más tests, pero para la prueba
creo que es suficiente (espero)
