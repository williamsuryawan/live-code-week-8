const User = require('../models/user')
const Apod = require('../models/apod')
const axios = require('axios');

class ApodController {
    
    static findApods (req,res) {
        console.log("masuk ke get apods", req.query)

        axios.get(`https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo&date=${req.query.date}`)
            .then(data => {
                console.log("berhasil dapat", data.data)
                res.status(200).json(data.data)
            })
            .catch ((err) => {
                console.log("Terjadi error get apods", err)
                res.status(500).json({
                    msg: 'ERROR get apods: ',err
                })
            })
    }
    
    //make and save favorites apods by userId
    static create(req,res) {
        console.log("Cek Input", req.body, req.loggedInUser.id, req.foundApod, req.query)
        Apod.create({
            title: req.body.other,
            desc: req.body.other,
            url: req.body.other,
            mediaType: req.body.other,
            date: req.body.date
        })
        .then(apodlist => {
            let newApods = apodlist
            console.log("created new apod", apodlist)
            return User.findOneAndUpdate({
                _id: req.loggedInUser.id
            }, {$push: {listsApods: apodlist._id}}, {new:true})
            .then(user => {
                console.log("Hasil push new apods:", user)
                res.status(200).json({
                    msg: 'Apod is successfully being saved',
                    data: newApods
                })
            })
            .catch(error => {
                res.status(500).json({
                    msg: 'ERROR save Apods: ',error
                })
            })
        })
    }

    static findOneApod (req,res) {
        Apod.findOne({_id : req.params.id})
        .then(foundApod => {
            console.log("berhasi=l get one apod", foundApod)
            res.status(200).json(foundApod)
        })
        .catch(err => {
            res.status(400).json("cant find")
        })
    }

    static displayListApodsByUserId (req,res) {
        console.log("masuk ke display apods", req.loggedInUser)
        User.findOne({
            _id: req.loggedInUser.id
        })
        .populate('listsApods')
        .then(foundUser => {
            console.log("User ditemukan, hasil pencarian user: ")
            if(!req.query.title) {
                console.log("masuk tanpa query", req.query.title)
                res.status(201).json({
                    msg: `List apods by user ${req.loggedInUser.email}`,
                    data: foundUser.listsApods
                })
            } else {
                console.log("masuk query", req.query.title)
                let filter = "title";
                let keyword = req.query.title;

                let filteredData = foundUser.listsApods.filter(function(obj) {
                    return obj[filter] === keyword;
                });
                console.log("hasil filter",  filteredData)
                res.status(201).json({
                    msg: `List apods by user ${req.loggedInUser.email}`,
                    data: filteredData
                })
            }
            
        })
        .catch(error =>{
            res.status(500).json({
                msg: 'ERROR Display list of apods by user ', error
            })
        })       
    }


    static deleteIndividualApod(req,res) {
        console.log("masuk ke method delete", req.params)
        Apod.findOne({
            _id: req.params.id
        })
        .then(foundApods =>{
            console.log("Apod yang akan diremove dan delete:", foundApods, req.loggedInUser)
            return User.findOneAndUpdate({
                _id:req.loggedInUser.id
            }, {$pull: {listsApods: foundApods._id}}, {new: true})
            .then(apodsToDelete => {
                console.log("Hasil update user untuk delete apods:", apodsToDelete)
                return Apod.findOneAndDelete({
                    _id: req.params.id
                })
                .then(apodDelete => {
                    console.log("Hasil delete: ", apodDelete)
                    res.status(200).json({
                        msg: 'Apod has been deleted',
                        data: apodDelete
                    })
                })
            })
        })
        .catch( error =>{
            res.status(500).json({
                msg: 'ERROR deleting apods', error
            })
        })
    }
}

module.exports = ApodController