const router = require('express').Router()

const { Blog } = require('../models')

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
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.delete('/:id', blogFinder,  async (req, res) => {
    if (req.blog){
        await req.blog.destroy()
    }else{
        console.log("Not found blog id: ", req.params.id)
        res.status(404).end()
    }

    res.status(200).end()
})

module.exports = router