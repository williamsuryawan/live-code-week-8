const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwtConvert = require('../helpers/jwtConvert');


class UserController {
    static findUser (req,res) {
        let findMe = {}
        User
            .find(findMe)
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static register (req,res) {
        console.log("masuk ke register", req.body)
        User
            .create({
                email: req.body.email,
                password: req.body.password,
            })
            .then(newUser => {
                console.log("Hasil user baru", newUser)
                res.status(201).json(newUser)
            })
            .catch(err => {
              console.log("terjadi error add users", err)  
              if (err.errors.email) {
                    res.status(400).json(err);
                } else if(err.errors.password) {
                    res.status(400).json(err);
                } else {
                    res.status(500).json(err);
                }
            }) 
    }

    static login (req,res) {
        console.log("masuk ke login", req.body)  
        User
            .findOne({
                email: req.body.email
            })
            .then(user => {
                if(!user) {
                    res.status(403).json({
                        message: `Wrong Email/Password`
                    })
                } else {
                    let isValid = bcrypt.compareSync(req.body.password, user.password)
                    console.log("Cek validity==>", isValid)
                    if(isValid) {
                        let accessToken = jwtConvert.sign({id: user._id, email: user.email})
                        console.log("Token dihasilkan token", accessToken)
                        res.status(200).json({
                            accessToken: accessToken
                        })
                    } else {
                        res.status(403).json({
                            message: 'Wrong Email/Password'
                        })
                    }
                }
            })
    }

    static getUserDetail (req,res) {
        User
          .findOne({
              email: req.loggedInUser.email
            })
          .then(user =>{
            console.log("hasil getuserdetail: ", user)
            res.status(200).json({
                msg: `Detail of user ${user.name}`,
                data: user
            })
          })
          .catch(error =>{
            res.status(500).json({
                msg: 'ERROR: ',error
            })
          })
    }
    
}

module.exports = UserController;