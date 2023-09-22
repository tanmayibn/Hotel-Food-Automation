function manager(req, res, next) {
    if(req.isAuthenticated() && req.user.role=='manager') {
        return next()
    }
    return res.redirect('/')
}
module.exports = manager