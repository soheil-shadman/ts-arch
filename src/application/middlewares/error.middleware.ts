import { Request, Response, NextFunction } from 'express';
import { HttpError } from "../../common/application/httpError";

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
    const status = err instanceof HttpError ? err.status : 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({
        status,
        message,
    });
}