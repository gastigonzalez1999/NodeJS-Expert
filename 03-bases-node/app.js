const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');
const colors = require('colors');

console.clear();

//******* Forma sin paquete yargs ********//
// const [,, arg3 = 'base=5'] = process.argv;
// const [, base = 5] = arg3.split('=');
// console.log(process.argv);

//const base = 3;

crearArchivo(argv.b, argv.l, argv.h)
    .then(nombreArchivo => console.log(nombreArchivo.rainbow))
    .catch(err => console.log(err));


