import apiService from "./APIService"

const autoCompleteEndpoint = apiService('https://api.locationiq.com/v1')
const reverseEndpoint = apiService('https://us1.locationiq.com/v1/reverse.php')


export default {
    autoComplete(q) {
        return autoCompleteEndpoint.get('/autocomplete.php', {
            params: {
                key: 'pk.6abf3702b41e11571cde8eeae1358901',
                q,
                limit: 5,
            }
        })
    },
    reverse(lat, lon) {
        return reverseEndpoint.get('', {
            params: {
                key: 'pk.6abf3702b41e11571cde8eeae1358901',
                lat,
                lon,
                format: 'json',
            }
        })
    }
}
