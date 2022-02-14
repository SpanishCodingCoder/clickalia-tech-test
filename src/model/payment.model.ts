// Modelo del objeto de pago
export default interface Payment {
    amount: number,
    currency: string,
    completed: boolean,
    customer: number
}