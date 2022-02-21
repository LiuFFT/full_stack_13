const router = require('express').Router()

const { Blog } = require('../models');
const { sequelize } = require('../util/db')

router.get('/', async (req, res, next) => {
    const authors = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
        ],
        group: ['author'],
        order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
    })

    res.json(authors)
})

module.exports = router