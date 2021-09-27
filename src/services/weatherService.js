import axios from "axios"

const weatherService = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getCity(lat, lon) {
        return weatherService.get('/onecall', {
            params: {
                appid: '3df97b88e0470b962211fdcb9809ad37',
                lat,
                lon,
            }
        })
    }
}
