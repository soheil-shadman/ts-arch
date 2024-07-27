import { Container } from 'inversify';
import { UserService } from '../application/services/UserServices';
import { UserRepository } from '../infrastructure/data/UserRepository';
import { IUserService } from '../domain/interfaces/IUserService';
import { UsersController } from '../gateway/controllers/UserController';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import TYPES from '../types';
import { DataSource } from 'typeorm';
import dataSource from './typeorm.config';


const container = new Container();

container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<UsersController>(UsersController).toSelf();
container.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);
export default container;