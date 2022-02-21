const router = require('express').Router()

const { Reading, User} = require("../models");
const {tokenExtractor} = require("../middleware/errorhandler");

router.post('/', async (req, res, next) => {
    const reading_list = await Reading.create(req.body)
    const return_reading_list = {
        id: reading_list.id,
        userId: reading_list.userId,
        blogId: reading_list.blogId
    }
    res.json(return_reading_list)
})


router.put('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id);
    const reading_list = await Reading.findByPk(req.params.id)

    if (user){
        if(user.id === reading_list.user_id){
            reading_list.read = true
            await reading_list.save()
            res.json(reading_list)
        } else {
            res.status(404).end()
        }
    }
})

module.exports = router