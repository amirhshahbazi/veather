import axios from "axios"

const autocompleteService = axios.create({
    baseURL: 'https://api.locationiq.com/v1',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

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
