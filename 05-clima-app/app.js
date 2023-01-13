import dotenv from 'dotenv'
dotenv.config();
import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer"
import { Busquedas } from "./models/busquedas";

const main = async () => {
    const busquedas = new Busquedas();
    let opt;
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad:');

                // Buscar los lugares
                const lugares = await busquedas.ciudad(lugar);

                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id === '0') continue;

                const lugarSeleccionado = lugares.find(l => l.id === id);
                busquedas.agregarHistorial(lugarSeleccionado.nombre);

                // Clima
                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);

                // Mostrar resultados
                console.clear();
                console.log('\nInformacion de la ciudad\n');
                console.log('Ciudad', lugarSeleccionado.nombre.green);
                console.log('Lat', lugarSeleccionado.lat);
                console.log('Lng', lugarSeleccionado.lng);
                console.log('Temp', clima.temp);
                console.log('Minima', clima.min);
                console.log('Maxima', clima.max);
                console.log('Como esta el clima', clima.desc.green);

            break;

            case '2':
                busquedas.historal.forEach((lugar, i) => {
                    const idx = `${i + 1}`.green;
                    console.log(`${idx} ${lugar}`);
                })
            break;

            default:
                break;
        }

        guardarDb(tareas.listadoArr);

        await pausa();

    } while (opt !== 0);
} 

main();