import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const Authenticate = async(req,res,next)=>{
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id : verifyToken._id, "tokens.token":token}); //entire document u can get

        if(!rootUser){
            throw new Error("User not found");
        }
        req.token = token;
        req.rootUser = rootUser;

        req.userID = rootUser._id;
        next();

    }catch(err){
        res.status(401).send("unauthorized no token given");
        console.log(err);
    }
};

// module.exports = Authenticate;