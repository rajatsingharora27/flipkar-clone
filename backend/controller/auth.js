const User = require('../models/user');
const jwt = require('jsonwebtoken');
const CryptoJs=require('crypto-js');


exports.signup = (req, res) => {


    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (user) {
                return res.status(200).json("user Already exist");
            }

            const _user = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_KEY).toString(),
            });

            _user.save((err, data) => {
                if (err) {
                    return res.status(400).json(err);
                }
                if (data) {
                    return res.status(200).json('User added Successfully');
                }
            })
        });
};



exports.signin = async (req, res) => {

    // Check if user exist

    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            // check for the password entered
            var bytes = CryptoJs.AES.decrypt(user.password, process.env.PASS_KEY);
            var originalPassword = bytes.toString(CryptoJs.enc.Utf8);

            //check if enterd password is correct or not
            if (req.body.password !== originalPassword) {
                res.status(400).json("passowd entered is worong")
            } else {
                // creating the JWT 
                const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_KEY, { expiresIn: '7d' });
                const {_id, first_name, last_name, email, role, fullname } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        first_name,
                        last_name,
                        email,
                        role,
                        fullname
                    }
                })
            }
        }
        else {
            res.status(400).json("User does not exist");
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
};

exports.requireSignin =(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.user=decoded // adding one more property to user
    console.log(decoded);
    next();
}
