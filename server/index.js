const express = require('express')
const app = express()
const port = 3000

app.get('api/v1/autocomplete', (req, res) => {
    console.log(req, res)
})

app.listen(port, () => {
    console.log(`ready on :${port}`)
})
