const express = require('express');
const cors = require('cors');
const { dbConnecrtion } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Puerto escuchando en', this.port);
        });
    }

    async connectDB() {
        await dbConnecrtion();
    }
}

module.exports = Server;