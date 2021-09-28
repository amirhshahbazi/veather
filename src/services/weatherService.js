import apiService from "./APIService"

const weatherService = apiService('https://api.openweathermap.org/data/2.5')

export default {
    getCity(lat, lon) {
        return weatherService.get('/onecall', {
            params: {
                appid: '3df97b88e0470b962211fdcb9809ad37',
                units: 'metric',
                lat,
                lon,
            }
        })
    }
}
