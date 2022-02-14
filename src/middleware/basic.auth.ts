/* 
Esto se debería cambiar por un verdadero sistema de autenticación pero para la prueba técnica nos sirve.
Tambien debería ir por cada ruta en particular, quizás algunas requieran headers diferentes
*/
import express from 'express';

export function basicAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) : void {
    if(!req.headers.authorization) {
        res.status(404).json({ "forbidden": true });
    } else if (req.headers.authorization !== '1234') {
        res.status(404).json({ "wrong_header_value": true });
    }
    next();
}