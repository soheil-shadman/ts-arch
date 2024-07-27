import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'Mawooooooooo mawooooo',
        },
    },
    apis: ['./src/gateway/controllers/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app: Application) => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;