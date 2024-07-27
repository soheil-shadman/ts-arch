import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import 'reflect-metadata';
import { IUserService } from '../../domain/interfaces/IUserService';
import { User } from '../../domain/entities/User';
import TYPES from '../../types';

@controller('/api/users')
export class UsersController {
    constructor(
        @inject(TYPES.IUserService) private userService: IUserService
    ) {}

    /**
     * @swagger
     * /api/users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The user ID
     *     responses:
     *       200:
     *         description: The user description by ID
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *       404:
     *         description: User not found
     */
    @httpGet('/:id')
    async getUserById(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        const user = await this.userService.findUserById(id);
        if (!user) {
            res.status(404).send();
            return;
        }
        res.status(200).json(user);
    }

    /**
     * @swagger
     * /api/users:
     *   post:
     *     summary: Register a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *     responses:
     *       201:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     */
    @httpPost('/')
    async registerUser(req: Request, res: Response): Promise<void> {
        const user = new User();
        user.name = req.body.name;
        await this.userService.registerUser(user);
        res.status(201).json(user);
    }
}