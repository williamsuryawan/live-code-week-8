require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = {
    sign(user) {
        console.log("masuk ke jwt convert", user, process.env.JWT_SECRET)
        return jwt.sign(user, process.env.JWT_SECRET)
    },

    verify(token) {
        console.log("masuk ke verifikasi jwt")
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}