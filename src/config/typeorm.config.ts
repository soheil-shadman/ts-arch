import { DataSource } from 'typeorm';
import { User } from '../domain/entities/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User],
    synchronize: true,
    logging: true, 
});

export default dataSource;
