import jwt from "jsonwebtoken";

const tokenParser = async(req , res , next) => {
    const user = req.headers.authorization

    if(user){
        const data = jwt.verify(user, process.env.JWT_SECRET)
     
        req.user = await data?.id
     
        next()
    }else{
        next()
    }


}

export default tokenParser