import apiService from "./APIService"

const autocompleteService = apiService('https://api.locationiq.com/v1')

export default {
    getList(q) {
        return autocompleteService.get('/autocomplete.php', {
            params: {
                key: 'pk.6abf3702b41e11571cde8eeae1358901',
                q,
                limit: 5,
            }
        })
    }
}
