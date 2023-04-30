
//to handle page not found case
export const notFound = (req, res, next) => {
    const error = new Error(`Not found ${req.originalUrl}`);
    error.name='Not Found'
    res.status(404);
    next(error);
}
//middleware to handle error in the app
export const errorHandler = (error,req,res,next)=>{
    let statusCode
    if(error.name==='ValidationError'){
        statusCode=400
    }
    else{
        statusCode = !res.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
      }
    res.status(statusCode).json({
        name:error.name,
        code:statusCode,
        message : error.message
    })
}