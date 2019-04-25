const User = require('../models/user')
const { verify } = require('../helpers/jwtConvert.js')

module.exports = {
    authentication: function (req,res, next) {
        // console.log("masuk auth", req.headers)
        if(req.headers.accesstoken) {
            // console.log("req.body", req.body)
            console.log("Input verifikasi JWT", req.headers.hasOwnProperty('accessToken'))
            try {
                const decoded = verify(req.headers.accesstoken);
                console.log("Hasil verifikasi JWT", decoded)
                if( decoded != null) {
                    req.loggedInUser = decoded;
                    next()
                } else {
                    res.status(400).json({
                        message: 'Invalid Token'
                    })
                }
            } catch (err) {
                res.status(400).json({
                    message: 'Invalid Token'
                })
            }
        } else {
            res.status(400).json({
                message: 'Please provide token'
            })
        }
    }
}