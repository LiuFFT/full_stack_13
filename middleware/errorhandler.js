const jwt = require("jsonwebtoken");
const { SECRET } = require('../util/config');
const {User, Session} = require("../models");

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'SequelizeValidationError') {
        response.status(400).json({error})
    }

    next(error)
};

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } else {
        res.status(401).json({ error: 'token missing' });
    }

    next();
};

const sessionCheck = async (req, res, next) => {
    const user = await User.findByPk(req.decodedToken.id);
    const session = await Session.findOne({
        where: {
            user_id: user.id
        }
    });

    if (!session){
        res.status(401).json({error: "User does not have session data"})
    }

    if (session.token !== req.get("authorization").substring(7)){
        res.status(401).json({error: "Login status is not correct, please login again!"})
    }

    next();
}



module.exports = {
    errorHandler,
    tokenExtractor,
    sessionCheck
}