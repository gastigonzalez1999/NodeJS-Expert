import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [
        {
            value: 1,
            name: `${'1.'.green} Buscar ciudad`,
        },
        {
            value: 2,
            name: `${'2.'.green} Historial`,
        },
        {
            value: 3,
            name: `${'3.'.green} Salir`,
        },
    ],
}];

export const inquirerMenu = async () => {
    console.clear();
    console.log("   -------------   ".green);
    console.log('    Seleccione una opcion     '.green);
    console.log("   -------------   \n".green);

    const { opcion } = await inquirer.prompt(preguntas);
    console.log(opcion);

    return opcion;
};

export const pausa = async () => {
    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`,
        },
    ];

    console.log('\n');
    await inquirer.prompt(pregunta);
};

export const leerInput = async (mensaje) => {
    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const desc = await inquirer.prompt(pregunta);

    return desc;
};

export const listarLugares = async (lugares = []) => {
    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0'.green + 'Cancelar',
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione',
            choices,
        }
    ];

    const { id } = await inquirer.prompt(preguntas);
    
    return id;
};

export const confirmar = async (message) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);

    return ok;
};

export const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: tarea.completadodEn ? true : false,
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices,
        }
    ];

    const { ids } = await inquirer.prompt(preguntas);
    
    return ids;
};