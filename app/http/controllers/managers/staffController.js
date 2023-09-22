const User = require('../../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function staffController(){
    return {
        register_staff(req,res) {
            res.render('hotel/staff')
        },
        
        async postRegister_staff(req,res) {
            //Logic
            const {username, email, password} = req.body;
            //Validate request #TODO : yet to be implemented
            //show errors??
            if(!username || !email || !password){
                req.flash('Please fill all the fields');
                return res.redirect('/staff')
            }
            //CHeck if email exists
            User.exists({ email: email }, (err, result) => {
                if(result){
                    req.flash('error','Email already taken! Person already added');
                    return res.redirect('/staff')
                }
            })
            //Hash password
            const hashedPassword = await bcrypt.hash(password, 10)
            //Create user in database
            const user1 = new User({
                username: username,
                email: email,
                password: hashedPassword,
                role:'staff',
                added_by: req.user._id
            })
            user1.save().then((user) => {
                req.flash('Added Successfully');
                return res.redirect('/manager')
            }).catch(err => {
                console.log(Error);
                return res.redirect('/staff')
            })
            console.log(req.body);           
        },

        async displayStaff(req,res) {
            const users = await User.find({
                $and: [
                    { "role": { $eq: "staff" }},
                     // change later to completed
                     {"added_by" :{$eq: req.user._id} },
                  ]
            })
            if(users == null)
                return console.log("No order yet")
            console.log(users)
            return res.render('hotel/staff_list', {users: users})
           // res.render('hotel/menu')
        },

        // yet to implement
        async deleteStaff(req,res) {
            const id = req.params.id
            await User.findByIdAndRemove(id).exec()
            return res.redirect('/staff_list')
           // res.render('hotel/menu')
        },
    }
}

module.exports = staffController
