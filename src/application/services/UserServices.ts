import { inject, injectable } from 'inversify';
import { IUserService } from '../../domain/interfaces/IUserService';
import { User } from '../../domain/entities/User';
import TYPES from '../../types';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';

@injectable()
export class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(
        @inject(TYPES.IUserRepository) userRepository: IUserRepository
    ) {
        this.userRepository = userRepository;
    }

    async findUserById(id: number): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async registerUser(user: User): Promise<User> {
        return this.userRepository.create(user);
    }
}