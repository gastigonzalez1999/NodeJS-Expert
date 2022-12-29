const fs = require('fs');
const colors = require('colors');

const crearArchivo =  async (base = 5, listar = false, hasta = 10) => {
    try {
        
        let result, consola = '';

        for (let i = 0; i <= hasta; i++) {
            result += `${base} x ${i} = ${base * i}\n`;
            consola += `${base} ${'x'.green} ${i} ${'='.green} ${base * i}\n`;
        }

        if (listar) {
            console.clear();
            console.log("   -------------   ".green);
            console.log('    Tabla del:'.green, colors.blue(base));
            console.log("   -------------   ".green);
            console.log(consola);
        }

        fs.writeFileSync(`./salida/tabla-${base}.txt`, result);

        return `tabla-${base}.txt`;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearArchivo,
}