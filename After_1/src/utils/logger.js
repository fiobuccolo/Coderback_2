function logger(req,res,next){
    console.log(req);
    console.log(`${req.method}
     - ${req.originalUrl}
     - ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}
           `
     );

    next()
}

export default logger
