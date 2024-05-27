const generateToken = require('../util/generateToken');


const auth = async (req, res, next) => {

    try{
        const token = req.cookies.jwt;
        const verifyUser = generateToken.verifyToken(token);
        req.userEmail = verifyUser;
        next();
    }catch(e){
        res.status(401).send(e.message);
    }

};


module.exports = auth;