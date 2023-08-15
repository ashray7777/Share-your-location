import { Map } from './UI/Map.js';

class LoadedPlace {
    constructor(coordinates, address) {
        new Map(coordinates);
        const headerTitleEl = document.querySelector('header h1');
        headerTitleEl.textContent = address; 
    }
}

const url = new URL(location.href); //built in class to get obj from url
const queryParams = url.searchParams; //content after ? in link stored in form of key value pairs
const coords = {
    lat: parseFloat(queryParams.get('lat')),
    lng: parseFloat(queryParams.get('lng'))
}
const address = queryParams.get('address');
new LoadedPlace(coords, address);