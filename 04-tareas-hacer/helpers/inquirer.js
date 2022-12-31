import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [
        {
            value: '1',
            name: '1. Crear tarea',
        },
        {
            value: '2',
            name: '2. Listar tareas',
        },
        {
            value: '3',
            name: '3. Listar tareas completadas',
        },
        {
            value: '4',
            name: '4. Listar tareas pendientes',
        },
        {
            value: '5',
            name: '5. Completar tarea(s)',
        },
        {
            value: '6',
            name: '6. Borrar tarea',
        },
        {
            value: '0',
            name: '0. Salir',
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
}

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
}

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
}