import axios from "axios";
import fs from "fs";

export class Busquedas {
    historal = [];
    dbPath = './db/database.json';

    constructor() {

    }

    get paramsMapBox() {
        return {
                'access_token': process.env.MAPBOX,
                'limit': 5,
                'language': 'es',
        }
    }

    getParamsOpenWeather() {
        return {
            appId: process.env.OPENWEATHER,
            units: 'metric',
            lang: 'es',
        }
    }

    getHistoriaCapitalizado () {
        return this.historal.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        })
    }

    async ciudad(lugar = '') { 
        try {
        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
            params: this.paramsMapBox
        });
        
        const resp = await instance.get();
        return resp.data.features.map(lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1],
        }));
        
        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat = '', lon = '') { 
        try {
        const instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: { ...this.getParamsOpenWeather, lat, lon }
        });
        
        const resp = await instance.get();
        const { weather, main} = resp.data;

        return {
            desc: weather[0].description,
            min: main.temp_min,
            max: main.temp_max,
            tmp: main.temp,
        };
        
        } catch (error) {
            return [];
        }
    }

    agregarHistorial(lugar = '') {
        if (this.historal.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        this.historal.unshift(lugar.toLocaleLowerCase());

        this.guardarDb();
    }

    guardarDb() {
        const payload = {
            historial: this.historal
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDb() {
        if (!fs.existsSync(this.dbPath)) {
            return null;
        }
    
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
    
        this.historal = data.historal;
    }

}