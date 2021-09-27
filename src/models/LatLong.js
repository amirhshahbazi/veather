class LatLong {
    constructor(latitude, longitude) {
        this.latitude = latitude
        this.longitude = longitude
    }
    get coordinates() {
        return [this.latitude, this.longitude]
    }
}

export default LatLong
