const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'SequelizeValidationError') {
        return response.status(400).json({error})
    }



    next(error)
}

module.exports = errorHandler