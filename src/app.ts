import express from 'express';
import setupSwagger from './config/swagger.config';
import container from './config/inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(express.json());
    setupSwagger(app);
});

const app = server.build();
export { app };
