const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const isAuthenticated = async (req, res, next) => {
    console.log("alooo");
    try {
        // bearer {TOKEN}
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({
                err: "authorization header not found"
            })
        };
       
        const token = authHeader.split(" ")[1] 
        //split => ["bearer" , "{TOKEN}" ]
        // token = req.cookie.t  // whatever name given to token

        if(!token) {
            return res.status(401).json({
                err: "token not found"
            })
        }
        // console.log("authheader ", authHeader);
        // console.log("authheader ", authHeader.split(" "));
        // console.log("token " , token);
         const decoded = jwt.verify(token, "SECRET MESSAGE");
         console.log(" ********** decode *********" )
         console.log(typeof decoded);
         console.log( decoded);
         console.log(" ********** decode.user *********" )
         console.log(typeof decoded.user);
         console.log( decoded.user);
         
         const user =await User.findOne({where: {id: decoded.user.id}})
         if(!user) {
            return res.status(400).json({
                err: "user not found"
            })
         }

         //extending req object so that we don't need to make 
         // another databse call
       req.user = user;
         next();// go to next middlware
    } catch(e){
        console.log("err: ",e);
        return res.status(500).send(e);
    }
};

const isSeller = async (req, res, next) => {
        if(req.user.dataValues.isSeller) {
            next();
        } else {
            return res.staus(500).json({
                err: "you are not seller"
            });
        }
};


module.exports = { isAuthenticated, isSeller }



