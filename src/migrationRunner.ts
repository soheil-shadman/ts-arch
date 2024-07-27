import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './domain/entities/User';
import dotenv from 'dotenv'; 

dotenv.config();
const DB_URL =process.env.DATABASE_URL;
const dataSourceConfig: DataSourceOptions = {
    type: 'postgres',

    url:DB_URL,
    entities: [User],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
};

const dataSource = new DataSource(dataSourceConfig);

async function runMigrations() {
    try {
        await dataSource.initialize();
        console.log('Data Source has been initialized.');
        
        await dataSource.runMigrations();
        console.log('Migrations have been run ^_^.');
    } catch (error) {
        console.error('Error during Data Source initialization:', error);
    } finally {
        await dataSource.destroy();
    }
}

runMigrations();