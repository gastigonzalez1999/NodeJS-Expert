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

const getEmpleado = (id, callback) => {

    const empleado = empleados.find( (e) => e.id === id)?.nombre;

    if (empleado)
        callback(null, empleado);
    else
        callback(`Empleado con id ${id} no existe`);
};

getEmpleado(1, (err, empleado) => {

    if (err)
        return console.log(err);
    else 
        console.log(empleado.nombre);
});


// const getSalario = (id, callback) => {

//     const salario = salarios.find( (s) => {
//         return s.id === id
//     })

//     if (salario)
//         callback(null, salario);
//     else
//         callback(`Empleado con id ${id} no existe`);
// };

// getSalario(1, (err, salario) => {
//     if (err)
//         return console.log(err);
//     else
//         return console.log(salario);
// });

// Una mejor forma de hacerlo para extraer el salario directamente

const getSalario = (id, callback) => {

    const salario = salarios.find( (s) => s.id === id)?.salario; //Null-check operator

    if (salario)
        callback(null, salario);
    else
        callback(`Empleado con id ${id} no existe`);
};

getSalario(1, (err, salario) => {
    if (err)
        return console.log(err);
    else
        return console.log(salario);
});


//callback hell example

getEmpleado(1, (err, empleado) => {

    if (err)
        return console.log(err);
    else 
        getSalario(1, (err, salario) => {
            if (err)
                return console.log(err);
            else
                return console.log('El empleado', empleado, 'tiene un salario de', salario);
        });
});

//Imagine having this 10 times, it makes it really hard to understand the code.

