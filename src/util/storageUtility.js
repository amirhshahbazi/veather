import _ from 'lodash'

export const storageUtility = {
    setFavoriteCity(city) {
        localStorage.setItem('favoriteCity', JSON.stringify(city))
    },
    getFavoriteCity() {
        return JSON.parse(localStorage.getItem('favoriteCity'))
    },
    clearFavoriteCity() {
        localStorage.removeItem('favoriteCity')
    },
    isFavorite(city) {
        return new Promise((resolve) => {
            resolve(_.isEqual(city, this.getFavoriteCity()))
        })
    }
}
