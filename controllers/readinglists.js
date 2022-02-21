const router = require('express').Router()

const { Reading } = require("../models");

router.post('/', async (req, res, next) => {
    const reading_list = await Reading.create(req.body)
    const return_reading_list = {
        id: reading_list.id,
        userId: reading_list.userId,
        blogId: reading_list.blogId
    }
    res.json(return_reading_list)
})

module.exports = router