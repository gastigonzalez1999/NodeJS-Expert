import fs from "fs";

const archivo = './db/data.json';

export const guardarDb = (data) => {

    fs.writeFileSync(archivo, JSON.stringify(data));
}

export const leerDb = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    return data;
}