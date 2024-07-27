import 'reflect-metadata'; 
import dotenv from 'dotenv'; 
import dataSource from './config/typeorm.config'; 
import { app } from './app'; 


dotenv.config();

const PORT = process.env.PORT;

async function startServer() {
    try {
      
        await dataSource.initialize();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); 
    }
}
startServer();