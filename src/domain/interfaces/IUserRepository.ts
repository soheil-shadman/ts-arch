import { User } from "../entities/User";

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    create(user: User): Promise<User>;
    update(id: number, user: Partial<User>): Promise<User | null>;
    delete(id: number): Promise<void>;
}