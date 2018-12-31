'use strict'

const passport = require('passport')

module.exports = function (routers, authService) {
    let { global, specific } = routers

    passport.serializeUser(serializeUser)
    passport.deserializeUser(deserializeUser)
    global.use(passport.initialize())
    global.use(passport.session())

    specific.get('/session', getSession)
    specific.post('/login', login)
    specific.post('/logout', logout)
    specific.post('/signup', signup)

    return routers

    function getSession(req, resp, next) {
        const username = req.isAuthenticated() ? req.user.username : undefined
        resp.json({
            'auth': req.isAuthenticated(),
            'username': username
        })
    }
    function login(req, resp, next) {
        authService
            .authenticate(req.body.username, req.body.password)
            .then(user => {
                req.login(user, (err) => {
                    if (err) next(err)
                    else resp.json(user)
                })
            })
            .catch(err => next(err))
    }
    function logout(req, resp, next) {
        req.logout()
        getSession(req, resp, next)
    }
    function signup(req, resp, next) {
        authService
            .createUser(req.body.fullname, req.body.username, req.body.password)
            .then(user => {
                req.login(user, (err) => {
                    if (err) next(err)
                    else resp.json(user)
                })
            })
    }

    function serializeUser(user, done) {
        console.log('serializeUser')
        done(null, user._id)
    }


    function deserializeUser(userId, done) {
        console.log('deserializeUser')

        authService
            .getUser(userId)
            .then(user => done(null, user))
            .catch(err => done(err))
    }

}