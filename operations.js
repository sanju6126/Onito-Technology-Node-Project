const config = require('./config');
const sql = require('mssql');


//since sql.connect is asynchronous opertaion therefore we need to use await ....and since await only works with async
async function getMovies(){
    try{
        let pool = await sql.connect(config);
        let moviesQuery =await pool.request().query('SELECT TOP(10) tconst,primaryTitle,runtimeMinutes,genres from  movies order by runtimeMinutes DESC')
        return moviesQuery.recordsets;
    }
    catch (error){
        console.log(error);
    }
}




async function getParticularMovie(movieId){
    try{
        let pool = await sql.connect(config);
        let movieQuery =await pool.request()
        .input('input_parameter',sql.Int,movieId)
        .query('SELECT * from  movies where Id = @input_parameter')
        return movieQuery.recordsets;
    }
    catch (error){
        console.log(error);
    }
}




async function addMovie(movie) {

    try {
        let pool = await sql.connect(config);
        let insertMovie = await pool.request()
            .input('tconst',sql.VarChar,movie.tconst)
            .input('titleType',sql.VarChar,movie.titleType)
            .input('primaryTitle',sql.VarChar,movie.primaryTitle)
            .input('runtimeMinutes',sql.VarChar,movie.runtimeMinutes)
            .input('genres',sql.VarChar,movie.genres)
            // .execute('InsertMovies');
            .query('INSERT INTO movies (tconst,titleType,primaryTitle,runtimeMinutes,genres)');
        return insertMovie.recordsets;

    }
    catch (err) {
        console.log(err);
    }
}






async function topRatedMovies(){
    try{
        let pool = await sql.connect(config);
        let topMoviesQuery = await pool.request().query('SELECT movies.tconst,movies.primaryTitle,movies.genres,ratings.averageRating from  movies JOIN ratings ON movies.tconst = ratings.tconst where averageRating > 6.0')

        return topMoviesQuery.recordsets;
    }
    catch (error){
        console.log(error);
    }
}


module.exports = {
    getMovies:getMovies,
    getParticularMovie:getParticularMovie,
    addMovie:addMovie,
    topRatedMovies:topRatedMovies
}