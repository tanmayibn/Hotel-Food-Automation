const Hotel = require('../../../models/hotel')
const Menu = require('../../../models/menu')

function homeController(){
    return {
        //read
        async index(req,res) {

            const hotels = await Hotel.find()
            return res.render('customers/u_home', {hotels: hotels})
        },
        async displayMenu(req,res) {
            const hotelname = req.params.hotelname
            const menu = await Menu.find({hotelname: hotelname})
            return res.render('customers/display_menu', {menu: menu})
           // res.render('hotel/menu')
        },
    }
}

module.exports = homeController