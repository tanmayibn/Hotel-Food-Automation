const User = require('../../../models/user')
const bcrypt = require('bcrypt')
function userController(){
    return {
        //read
        async changePassword(req,res1){
            let session = req.session;
            if(req.user.email){
                var old_password = req.body.oldPassword;
                var new_password = req.body.newPassword;
                var con_password = req.body.cPassword;

                
                if( req.user != null){
                    var hash = req.user.password;
                    bcrypt.compare(old_password, hash, function(err,res){
                        if( res){
                                //Password matches
                            if(new_password == con_password ){
                                bcrypt.hash(new_password,10,function(err,hash){
                                req.user.password = hash;
                                req.user.save(function(err,user){
                                    if(err)
                                        return console.error(err);
                                    res1.render("manger");
                                    console.log("Yippie! your password has been changed. :)");
                                        })
                                    })
                                }
                            }
                            else{
                                console.log("Password does not match")
                                req1.render('customers/changePassword');
                            }
                        })
                    }
            }
        },

        async renderchangePassword(req,res){
            let session = req.session;
            //res.redirect('/changePassword');
           if(req.user.email){
                res.render('customers/changePassword');
           }
          else{
                console.log("error")
            }
          //  console.log(req.user)
        }
        
    }
}

module.exports = userController