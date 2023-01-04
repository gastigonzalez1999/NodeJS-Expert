import colors from 'colors';
import { guardarDb, leerDb } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar, mostrarListadoChecklist } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';

const main = async () => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDb = leerDb();

    if (tareasDb) {
        tareas.cargarTareasDeArray(tareasDb);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas(true);
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.marcarCompletadas(ids);
            break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                const ok = confirmar('Estas seguro?');
                if (id !== 0) {
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;

            default:
                break;
        }

        guardarDb(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}

main();