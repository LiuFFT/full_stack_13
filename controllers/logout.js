const router = require('express').Router()

const {tokenExtractor, sessionCheck} = require("../middleware/errorhandler");
const {User, Session} = require("../models");

router.delete('/', tokenExtractor, sessionCheck, async (req, res, next) => {
    const user = await User.findByPk(req.decodedToken.id);
    const session = await Session.findOne({
        where: {
            user_id: user.id
        }
    });

    if (session) {
        await session.destroy();
        res.json({ message: 'User has logged out.' });
    }

})

module.exports = router