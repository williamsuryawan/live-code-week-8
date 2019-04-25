require('dotenv').config();
const express = require('express');
const app = express();
const cors = require ('cors')
const mongoose = require('mongoose');

app.use(cors())
mongoose.connect(`mongodb://localhost/from-nasa-with-love`, { useNewUrlParser: true });

// const index = require('./routes/index');
const Router = require('./routes/index')
// const questionRouter = require('./routes/questions')
// const answerRouter = require('./routes/answers')
const port = process.env.port || 3000


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/', index);
app.use('/', Router)
// app.use('/questions', questionRouter)
// app.use('/answers', answerRouter)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

module.exports = app;