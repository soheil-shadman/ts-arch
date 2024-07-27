import { Repository, DataSource } from 'typeorm';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { inject, injectable } from 'inversify';
import TYPES from '../../types';

@injectable()
export class UserRepository implements IUserRepository{
    private repository: Repository<User>;

    constructor(
        @inject(TYPES.DataSource) dataSource: DataSource
    ) {
        this.repository = dataSource.getRepository(User);
    }

    async findAll(): Promise<User[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<User | null> {
        return this.repository.findOneBy({ id });
    }

    async create(user: User): Promise<User> {
        return this.repository.save(user);
    }

    async update(id: number, user: Partial<User>): Promise<User | null> {
        await this.repository.update(id, user);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}