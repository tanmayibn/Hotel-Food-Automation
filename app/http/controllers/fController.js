const User = require('../../models/user')
const Hotel = require('../../models/hotel')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')

var nodemailer = require('nodemailer');


function fController(){
    return {
    async reset(req,res) {
        const id = req.params.id;
        const token = req.params.token;

  // Check if this id exist in database
  const user = await User.findOne({_id : id});
    if(user == null){
    res.send('Invalid id...');
        return;
    }
  // We have a valid id, and we have a valid user with this id
    const secret = process.env.JWT_SECRET_KEY + user.password;
    try {
        //console.log(token)
        //console.log(secret)
        const payload = jwt.verify(token, secret);
        res.render('auth/reset-password', { email: user.email });
    } catch (error) {
        console.log("1")
        console.log(error.message);
        res.send(error.message);
        }
    },
    async postReset(req, res) {
        const { id, token } = req.params;
        const { password, password2 } = req.body;
      
        // Check if this id exist in database
        if(password != password2){
            res.send("Password does not match.")
        }
        const user = await User.findOne({_id : id});
        if(user == null){
        res.send('Invalid id...');
          return;
        }
        console.log(user)
        const secret = process.env.JWT_SECRET_KEY + user.password;
        try {
          const payload = jwt.verify(token, secret);
          // validate password and password2 should match
          // we can simply find the user with the payload email and id  and finally update with new password
          // alwasy hash the password before saving
          bcrypt.hash(password,10,function(err,hash){
          User.findByIdAndUpdate(id, {password: hash },function (err, docs) {
                if (err){
                console.log("1")
                console.log(err)
                }
            
        }).catch(err => {
              //  console.log(err)
                return res.redirect('/auth/forgot-password')
            })
            //res.send(user);
            res.render("auth/login");
            console.log("Yippie! your password has been changed. :)");
            })
            }
            
          catch (error) {
            console.log("2")
          console.log(error.message);
          res.send(error.message);
        }
      },
      
      //res.render(/login)

    async postForgot(req, res) {
        const { email } = req.body;

    // Make sure user exist in database
        const user = await User.findOne({ email : email });
        //console.log(req.user._id)
        if(user == null){
            res.send('User not registered');
            return;
        }
        console.log(user)
  // User exist and now create a One time link valid for 15minutes
        const secret = process.env.JWT_SECRET_KEY + user.password;
        const payload = {
            email: user.email,
            id: user._id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: '15m' });
        const link = `http://localhost:3000/reset-password/${user._id}/${token}`;
  // Some how sent the link to the users email

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '2018csb1090@iitrpr.ac.in',
      pass: 'gazalgazal11'
    }
  });
  
  var mailOptions = {
    from: '2018csb1090@iitrpr.ac.in',
    to: user.email,
    subject: 'Sending Email using Node.js',
    text: `https://stark-bastion-38406.herokuapp.com/reset-password/${user._id}/${token}`
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
      //  console.log(link);
        res.send('Password reset link has been sent to ur email...');
    }
      
      //res.render(/login)
    }
}      

module.exports = fController
