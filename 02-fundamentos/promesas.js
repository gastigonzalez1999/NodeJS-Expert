const e = require("express");

const empleados = [
    {
        id:1,
        nombre: 'Gaston'
    },
    {
        id:2,
        nombre: 'Juan'
    },
    {
        id:3,
        nombre: 'Karen'
    },
];

const salarios = [
    {
        id:1,
        salario: 1000
    },
    {
        id:2,
        salario: 1500
    },
];

const getEmpleado = (id) => {

    const promesa = new Promise((resolve, reject) => {
        const empleado = empleados.find( (e) => e.id === id)?.nombre;

        (empleado) ? resolve(empleado) : reject(`No existe empleado con id ${id}`);
    });

    return promesa;
};

getEmpleado(1)
    .then(empleado => console.log(empleado))
    .catch(err => console.log(err))

const getSalario = (id) => {

    const promesa = new Promise((resolve, reject) => {
        const salario = salarios.find((s) => s.id === id)?.salario;

        (salario) ? resolve(salario) : reject(`No existe empleado con id ${id}`);
    });

    return promesa;
};

getSalario(1)
    .then(salario => console.log(salario))
    .catch(err => console.log(err))


// getEmpleado(id)
//     .then(empleado => {
//         getSalario(id)
//             .then(salario => {
//                 console.log('El empleado tiene el nombre', empleado, 'y salario', salario);
//             })
//             .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err))

//That was the worse way to do promises, now lets see how to do it correctly with promise chaining

let nombre;

getEmpleado(id)
    .then(empleado => {
        nombre = empleado;
        return getSalario(id);
    })
    .then(salario => {
        console.log(`El empleado:,`, nombre, 'tiene un salario de', salario);
    })
    .catch(err => console.log(err));