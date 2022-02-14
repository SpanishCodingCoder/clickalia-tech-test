// Modelo del objeto de reembolso
export default interface Reimbursement {
    amount: number,
    currency: string,
    customer: number,
    completed: boolean
}