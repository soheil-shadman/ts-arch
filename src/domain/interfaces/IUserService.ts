import { User } from "../entities/User";

export interface IUserService {
    findUserById(id: number): Promise<User | null>;
    registerUser(user: User): Promise<User>;
}