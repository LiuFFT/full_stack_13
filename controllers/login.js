const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const {Session} = require("../models");

router.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    if (user.disabled) {
        return response.status(401).json({
            error: 'User account is disabled'
        })
    }

    const passwordCorrect = body.password === 'secret'

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)

    await Session.create({
        user_id: user.id,
        token: token,
    })

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = router