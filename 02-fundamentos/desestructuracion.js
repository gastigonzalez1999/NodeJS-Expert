const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getNombre() {
        return `${ this.nombre} ${this.apellido}`;
    }
}

const { nombre, apellido, poder } = deadpool;

function imprimirHeroe(heroe) {
    const { nombre, apellido, poder } = heroe;
    console.log(nombre, apellido, poder);
}

imprimirHeroe(deadpool);

// Version mejorada

function imprimirHeroe({ nombre, apellido, poder }) {
    console.log(nombre, apellido, poder);
}

imprimirHeroe(deadpool);

const heroes = ['Deadpool', 'Superman', 'Batman'];

//const h1 = heroes[0];

const [ h1, h2, h3 ] = heroes;
