const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_TOKEN_KEY);
        req.user = user //  adding one more property to user
        console.log(user);
      
    }
    else{
        res.status(400).json("Authorisation is required");
    }
    next();

}


exports.adminMiddleWare = (req, res, next) => {

    // console.log(req.user)
    if (req.user.role !== 'admin') {
        return res.status(400).json("Access Denied as you are not an admin");
    }
    next();
}