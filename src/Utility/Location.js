const API_KEY = 'SMQO44blB5u3ULvvaQZG';

export async function getAddressFromCoords(coords){
    const response = await fetch(`https://api.maptiler.com/geocoding/${coords.lng},${coords.lat}.json?key=${API_KEY}`);
    if(!response.ok){
        throw new Error('Failed to fetch address. Please try again');
    }
    const data = await response.json();
    if(data.error){
        throw new Error(data.error.message);
    }   

    const address =  data.features[0].place_name;
    return address;
}

export async function getCoordsFromAddress(address){
    const urlAddress = encodeURI(address);  //to get url friendly string 
    const response = await fetch(`https://api.maptiler.com/geocoding/${urlAddress}.json?key=${API_KEY}`);
    console.log(response);
    if(!response.ok){
        throw new Error('Failed to fetch coordinates. Please try again');
    }
    const data = await response.json();
    console.log(data);
    if(data.error){
        throw new Error(data.error.message);
    }

    const coordinates = {
        lat: data.features[0].center[1],
        lng: data.features[0].center[0]
    }
    return coordinates;
}