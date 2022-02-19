const Blog = require('./blog')
const User = require('./users')

Blog.sync()
User.sync()

module.exports = {
    Blog, User
}