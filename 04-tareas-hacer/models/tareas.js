import { Tarea } from "./tarea.js";

export class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasDeArray (tareas  = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas( completadas = true) {
        let indice = 0;
        this.listadoArr.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
            if (completadas) {
                if (completadoEn) {
                    indice += 1;
                    console.log(`${(indice + '.').green} ${desc} :: ${estado.green}`);
                }
            } else {
                if (!completadoEn) {
                    indice += 1;
                    console.log(`${(indice + '.').green} ${desc} :: ${estado}`);
                }
            }
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    marcarCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                const tarea = this._listado[tarea.id];
                tarea.completadoEn = null;
            }
        })
    }
}