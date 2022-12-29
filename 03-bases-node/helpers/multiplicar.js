const fs = require('fs');

const crearArchivo =  async (base = 5, listar = false) => {
    try {
        
        let result = '';

        for (let i = 0; i <= 10; i++) {
            result = `${base} x ${i} = ${base * i}\n`;
            console.log(result);
        }

        if (listar) {
            console.clear();
            console.log("   -------------   ");
            console.log('    Tabla del 5');
            console.log("   -------------   ");
            console.log(result);
        }

        fs.writeFileSync(`tabla-${base}.tx`, result);

        return `tabla-${base}.txt`;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearArchivo,
}