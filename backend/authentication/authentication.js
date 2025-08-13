import jwt from "jsonwebtoken"

function authenticateToken(req, res, next){
    const authHeader = req.header("Authorization");
    console.log(authHeader)
    if(!authHeader){
        return res.send({success: false, message: "Signin first"});
    }
    
    const token = authHeader.replace("Bearer", "");
  
    if(!token){
        return res.send({success: false, message: "Signin first"});
    }
   
    try{
       const decoded = jwt.verify(authHeader.split(" ")[1], '123456');
      console.log(decoded.email)
       req.user = decoded;
       next();

    }catch (error) {
    res.send({success: false, message: "signin first"});
    console.log(error.message)
  }
}
export default authenticateToken