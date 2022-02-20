const jwt = require("jsonwebtoken");
const { SECRET } = require('../util/config');

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



module.exports = {
    errorHandler,
    tokenExtractor
}