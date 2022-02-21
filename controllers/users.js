const router = require('express').Router()

const { User, Blog, Reading} = require('../models')

const userFinder = async (req, res, next) => {
    req.user = await User.findOne({
        where: {
            username: req.params.username
        }
    })

    next()
}

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: [
            {
                model: Blog
            }
        ]
    })
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        include: {
            model: Blog,
            as: 'marked_blogs',
            attributes: { exclude: ["id", "createdAt", "updatedAt", "userId"] },
            through: {
                attributes: []
            },
        }
    })

    res.json(user)
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

router.put('/:username', userFinder, async (req, res) => {
    if (req.user) {
        req.user.username = req.body.username
        await req.user.save()
        res.json(req.user)
    } else {
        res.status(404).end()
    }
})

module.exports = router