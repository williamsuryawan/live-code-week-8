require('dotenv').config();
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const axios = require('axios');

const apodSchema = new Schema ({
      title: {
        type: String,
        required: [true, "title can't be empty"]
      },
      desc: {
        type: String,
      }, 
      url: {
        type: String,
      },
      mediaType: {
        type: String,
      },
      date: {
        type: String,
      }
})

apodSchema.pre('save', async function(next) {
    console.log("masuk presave find apods", (this.date).slice(0,10))
    let data = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo&date=${(this.date).slice(0,10)}`)
    // .then(data => {
    try {
        console.log("berhasil dapat presave", data.data)
        this.title = data.data.title
        this.desc = data.data.explanation
        this.url = data.data.url
        this.mediaType = data.data.media_type
        next();
    }   catch {
        console.log("Terjadi error get apods", err)
        res.status(500).json({
            msg: 'ERROR get apods: ',err
        })
    }
    
    // })
    // .catch ((err) => {
        
    // })
    
    // if(this.password) { 
    //     this.password = hashPassword(this.password)
    // }
    next();
})

const Apod = mongoose.model('Apod', apodSchema)

module.exports = Apod;