const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const ApodController = require('../controllers/apodsController')
const {authentication} = require('../middlewares/authentication.js')
/* GET users listing. */

router.get('/users', UserController.findUser)
router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.get('/apods', ApodController.findApods)
router.use(authentication)
router.post('/apods', ApodController.create);
router.get('/myapods', ApodController.displayListApodsByUserId)
router.get('/myapods/:id', ApodController.findOneApod)
router.delete('/apods/:id', ApodController.deleteIndividualApod)


module.exports = router;