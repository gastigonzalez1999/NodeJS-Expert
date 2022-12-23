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

const getSalario = (id) => {

    const promesa = new Promise((resolve, reject) => {
        const salario = salarios.find((s) => s.id === id)?.salario;

        (salario) ? resolve(salario) : reject(`No existe empleado con id ${id}`);
    });

    return promesa;
};

const getInfoUSuario = async (id) => {
    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);

        return ` el ${empleado} tiene salario de ${salario}`;
        
    } catch (error) {
        throw error;
    }
   
}

getInfoUSuario(id)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));