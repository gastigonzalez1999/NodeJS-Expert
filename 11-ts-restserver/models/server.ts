import express from 'express';
import userRoutes from '../routes/user.routes';
import cors from "cors";
import { Sequelize } from 'sequelize';
import db from '../db/connection';

class Server {
    private app: express.Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('db online :)');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on', this.port);
        });
    }
}

export default Server;