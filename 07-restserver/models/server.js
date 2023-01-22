const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hola mundo');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Puerto escuchando en', this.port);
        });
    }
}

module.exports = Server;