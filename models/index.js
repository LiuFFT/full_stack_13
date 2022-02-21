const Blog = require('./blog')
const User = require('./user')
const Reading = require("./reading");

// hightlight-start
User.hasMany(Blog)
Blog.belongsTo(User)

// Blog.sync({ alter: true })
// User.sync({ alter: true })
// hightlight-end

User.belongsToMany(Blog, { through: Reading, as: 'marked_blogs' });
Blog.belongsToMany(User, { through: Reading, as: 'users_marked' });


module.exports = {
    Blog, User, Reading
}