
const axios = require('axios');

module.exports = {
    getApod: function (req,res, next) {
        console.log("masuk ke get apods middleware", req.query)

        axios.get(`https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo&date=${req.query.date}`)
            .then(data => {
                req.foundApod = data.data
                console.log("berhasil dapat apod", req.foundApod)
                next()
            })
            .catch ((err) => {
                console.log("Terjadi error get apods di middleware", err)
                res.status(500).json({
                    msg: 'ERROR get apods: ',err
                })
            })
    }
}