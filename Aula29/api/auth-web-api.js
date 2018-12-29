'use strict'

const passport = require('passport')

const authService = auth.init(es)

module.exports = function (app, router, authService) { 
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((userId, done) => authService
        .getUser(userId)
        .then(user => done(null, user))
        .catch(err => done(err))
    )
    app.use(passport.initialize())
    app.use(passport.session())

    router.get('/session', getSession)
    router.post('/login', login)
    router.post('/logout', logout)
    router.post('/signup', signup)

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