import passport from "passport";

export const passportCall = (strategy) => {
    return async (req,res,next)=>{
        console.log("passport strategy");
        passport.authenticate(strategy,function(error,user,info){
            if (error) return next(error);
            if(!user){
                return res.status(401)
                          .send({
                            error: info.messages ? info.messages : info.toString()
                          })
            }
            console.log(("Usuario obtenido en el passport call"));
            console.log(user);
            req.user = user 
            next();
        })(req,res,next)
    }
}