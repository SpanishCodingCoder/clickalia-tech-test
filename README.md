# Tech test

## Installation / running commands

To install dependencies

```
npm install
```

For hot reload running of code

```
nodemon / npm run dev
```

For running tests

```
npm run test
```

## Architecure / component explanation

The app is written in Typescript, using Express as the main library

The folders are as follows:

- controller: Contains the route controllers
- middleware: Contains a very basic authentication system as express middleware
- model: Contains the interfaces of the Payment and Reimbursement entities
- repository/payment-gateway: Contains the data origins for the PaymentGateway entity, as well as its type and interface definitions
- service: Contains dummy services (empty, unimplemented, but injected as DI), that would eventually be used for business logic
- tools: Contains exports that we need in the app, as well as any miscellaneous tool
- test: Contains the application tests (uses jest)

As data origin, we assume the ultimate payment provider, i.e: VISA, Bizum, etc...


The solution to have several data origins and integrate them in an easy was is to have the following architecture:

- Define an interface in /model/payment-gateway.origin.interface.ts

- All data origins in /model/payment-gateway/origins inherit from base class PaymentGatewayBase, to which the service object is injected for the handling of business logic. This service is dummy as of now, but in a real env, it should come out of a factory depending on the data origin to be used.

- An agnostic factory (it knows now what objects it creates)
    - /repository/payment-gateway/payment-gateway.origin.types.ts - Define types, here are the import statements   
   - /repository/payment-gateway/payment-gateway.factory.ts - Factory to generate data origins
- A config file
    application.config.ts


From here, we can integrate new data origins:

- Write them IMPLEMENTING the interface
- Add them to the definition types file

Thus, in our config file we have (uses dotenv):

```
import { paymentGatewayDataOriginsKeys } from "./src/repository/payment-gateway/payment-gateway.origin.types"

export default {
    port: 8000,
    dev: true,
    dataOrigin: <paymentGatewayDataOriginsKeys>2
}
```

and we define the second data origin in the config file.
If we want to use another one, we can change it here.


## Application routes

All routes require an authentication header:

```
Authentication: 1234
```

This emulates a real production authentication

- POST /payment

    Requires a body of type Payment, returns the same entity with the field .completed to true    

Sample:

Send:

```
{
    "amount": 1212
}
```

Receive:

```
Status Code: 200
{
    "amount": 1212,
    "completed": true
}
```


- POST /reimbursement

    Requires a body of type Reimbursement, , returns the same entity with the field .completed to true     


Sample:

Send:

```
{
    "amount": 1212
}
```

Receive:

```
Status Code: 200
{
    "amount": 1212,
    "completed": true
}
```

If body is not valid, they return:

```
Status Code: 400
{
    "invalid": true
}
```

And if header authentication is not correctly passed:

```
Status Code: 403
{
    "forbidden": true
}
```


## Tests

It has some testing. Requires more, but the exercise was explicitly to implement the architexture, leaving testing as a secondary concern.
Yeah, i know.
