import { NextFunction } from "express";

export function CatchError() {
    return function (constructor: Function) {
        const originalMethods = Object.getOwnPropertyNames(constructor.prototype)
            .filter((methodName) => methodName !== 'constructor')
            .map((methodName) => ({
                methodName,
                descriptor: Object.getOwnPropertyDescriptor(constructor.prototype, methodName)
            }));

        for (const { methodName, descriptor } of originalMethods) {
            if (descriptor && typeof descriptor.value === 'function') {
                const originalMethod = descriptor.value;

                descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
                    try {
                        await originalMethod.apply(this, [req, res, next]);
                    } catch (error) {
                        next(error);
                    }
                };

                Object.defineProperty(constructor.prototype, methodName, descriptor);
            }
        }
    };
}