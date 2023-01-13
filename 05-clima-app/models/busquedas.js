import axios from "axios";

export class Busquedas {
    historal = [];

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

}