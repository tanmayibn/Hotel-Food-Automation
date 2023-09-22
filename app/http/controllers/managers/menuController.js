const Menu = require('../../../models/menu')
const Hotel = require('../../../models/hotel')

function menuController(){
    return {
        //read
        async displayMenu(req,res) {
            const hotel = await Hotel.findOne({email: req.user.email})
            const menu = await Menu.find({hotelname: hotel.hotelname})
            if(menu == null)
            console.log("menu is null")
            return res.render('hotel/menu', {menu: menu})
           // res.render('hotel/menu')
        },
        async addMenu(req,res) {
            //Logic
            const {item, price, ingredients, recipe} = req.body;
            const hotel = await Hotel.findOne({email: req.user.email})
            const hotelName = hotel.hotelname
        //    console.log(hotelName)
         //   console.log(req.user)
            //Create user in database
            const menu = new Menu({
                hotelname: hotelName,
                item: item,
                price: price,
                ingredients: ingredients,
                recipe: recipe
            })
            menu.save().then((menu) => {
                return res.redirect('/menu')
            }).catch(err => {
                console.log(err)
                return res.redirect('/menu')
            })
          //  console.log(req.body);
            
          //  console.log(req.user)
            //console.log(req.body)
         

         // console.log(hotel)
        //    return res.redirect('/menu')
        },
        async deleteMenu(req,res) {
            const id = req.params.id
            await Menu.findByIdAndRemove(id).exec()
            return res.redirect('/menu')
           // res.render('hotel/menu')
        },
        async editMenu(req,res) {
            const {itemid, item, price, ingredients, recipe} = req.body;
            await Menu.findByIdAndUpdate(itemid, {item: item, price: price, ingredients: ingredients, recipe: recipe}).exec()
            return res.redirect('/menu')
           // res.render('hotel/menu')
        },
        
    }
}

module.exports = menuController