'use strict'

const passport = require('passport')

module.exports = function (routers, authService) { 
    let { global, specific } = routers

    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((userId, done) => authService
        .getUser(userId)
        .then(user => done(null, user))
        .catch(err => done(err))
    )
    global.use(passport.initialize())
    global.use(passport.session())

    specific.get('/session', getSession)
    specific.post('/login', login)
    specific.post('/logout', logout)
    specific.post('/signup', signup)

    return routers

    function getSession(req, resp, next) {
        const fullname = req.isAuthenticated() ? req.user.fullname : undefined
        resp.json({
            'auth': req.isAuthenticated(),
            'fullname': fullname
        })
    }
    function login(req, resp, next) {
        authService
            .authenticate(req.body.username, req.body.password)
            .then(user => {
                req.login(user, (err) => {
                    if(err) next(err)
                    else resp.json(user)
                })
            })
            .catch(err => next(err))
    }
    function logout(req, resp, next) {
        next({'statusCode': 500, 'err': 'Not implemented!'})
    }
    function signup(req, resp, next) {
        authService
            .createUser(req.body.fullname, req.body.username, req.body.password)
            .then(user => {
                req.login(user, (err) => {
                    if(err) next(err)
                    else resp.json(user)
                })
            })
    }
}