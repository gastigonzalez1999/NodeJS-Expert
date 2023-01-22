const http = require('http');

http.createServer((req, res) => {
    console.log('::::::::::::::::::::::::::::::::', req);
    res.write('Hola');
    res.end();
}).listen(8080);

console.log('Escuchando en', 8080);