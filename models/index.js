const Blog = require('./blog')
const User = require('./user')

// hightlight-start
User.hasMany(Blog)
Blog.belongsTo(User)

Blog.sync({ alter: true })
User.sync({ alter: true })
// hightlight-end


module.exports = {
    Blog, User
}