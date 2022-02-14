/* 
Esto se debería cambiar por un verdadero sistema de autenticación pero para la prueba técnica nos sirve.
Tambien debería ir por cada ruta en particular, quizás algunas requieran headers diferentes
*/
import express from 'express';

export function basicAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): express.Response | undefined {
    if (!req.headers.authorization || req.headers.authorization !== '1234') {
        return res.status(403).json({ "forbidden": true });
    }
    next();
}