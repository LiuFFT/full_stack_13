const router = require('express').Router()

const { Blog, User} = require('../models')
const {tokenExtractor} = require("../middleware/errorhandler");
const { Op } = require("sequelize");

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

router.get('/', blogFinder, async (req, res) => {
    const where = {}
    if (req.query.search) {
        where.title = {
            [Op.iLike]: `%${req.query.search}%`,
        }
    }

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name','id', 'username']
        },
        where
    })
    res.json(blogs)
})

router.post('/', async (req, res) => {
    const user = await User.findOne()
    const blog = await Blog.create({...req.body, userId: user.id})
    return res.json(blog)
})

router.delete('/:id', tokenExtractor, blogFinder,  async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id);

    if (user.id === req.blog.userId){
        if (req.blog){
            await req.blog.destroy()
        }else{
            console.log("Not found blog id: ", req.params.id)
            res.status(404).end()
        }

        res.status(200).end()
    }
})


// update likes
router.put('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

module.exports = router