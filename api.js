// var Db = require('./opertaions');
const Movie = require('./movie');
const Rating = require('./rating');

const operations = require('./operations');

const express = require('express');    //this is used to create API and make use of get,post,put,delete methods
const bodyParser = require('body-parser');    //this is used to parse request and response body
const cors = require('cors');           //this is to enable cross origin resourse sharing
const app = express();                  
const router = express.Router();

//configuring the APP
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1',router);  //base url


//middlewares   //this is for if u need to perform any authentication or authorization or login u need to write inside this ..this will be called before any route is called
router.use((request,response,next)=>{
    console.log('middleware');
    next();
})

router.route('/longest-duration-movies').get((request,response)=>{
    operations.getMovies().then(result => {
        // console.log(result);
        response.json(result[0]); //or result
    })
})


router.route('/movies/:id').get((request,response)=>{
    operations.getParticularMovie(request.params.id).then(result => {
        response.json(result[0]); 
    })
})


router.route('./new-movie').post((request,response)=>{
    let movie = {...request.body}

    operations.addMovie(movie).then(result => {
        response.status(201).json({message:'Success'}); 
    })
})


router.route('/top-rated-movies').get((request,response)=>{
    operations.topRatedMovies().then(result => {
        // console.log(result);
        response.json(result[0]); //or result
    })
})









var port = process.env.PORT || 8090;
app.listen(port);
console.log('Movies API is running at '+port);



// operations.getMovies().then(result => {
//     console.log(result);
// })