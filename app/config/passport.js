const LocalStrategy = require('passport-local')
const User = require('../models/user')
const bcrypt = require('bcrypt')
function init(passport){
    passport.use(new LocalStrategy({ usernameField: 'email'}, async (email, password, done) => {
        //Login logic
        //Check if email exists
        console.log('Hellooo')
        const user = await User.findOne({ email: email})
        if(!user){
            console.log('No user with this email')
            return done(null, false, { message: 'No user with this email'})
        }

        bcrypt.compare(password, user.password).then(match => {
            if(match){
                console.log('Logged in successfully.')
                return done(null, user, { message: 'Logged in successfully.'})
            }
            console.log('Wrong email or password')
            return done(null, false, { message: 'Wrong email or password'})

        }).catch(err => {
            return done(null, false, { message: 'Something went wrong.'})
        })
    }))

    passport.serializeUser((user,done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) =>{
            done(err, user)
        })
    })

}

module.exports = init