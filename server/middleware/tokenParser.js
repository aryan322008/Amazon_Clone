import jwt from "jsonwebtoken";
const SECRET = "coding is hard and freelancing with it is the hardest for newbies "

const tokenParser = async(req , res , next) => {
    const user = req.headers.authorization

   const data = jwt.verify(user, SECRET)

   req.user = await data?.id

   next()

}

export default tokenParser