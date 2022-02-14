import { Router } from "express";

// Queremos que nuestros controladores tengan esta interfaz
export default interface Controller {
    path: string,
    router: Router 
}