const indexController = require('../app/http/controllers/indexController')
const authController = require('../app/http/controllers/authController')
const fController = require('../app/http/controllers/fController')
const homeController = require('../app/http/controllers/customers/homeController')
const orderController = require('../app/http/controllers/customers/orderController')
const userController = require('../app/http/controllers/customers/userController')
const staffController = require('../app/http/controllers/managers/staffController')
const menuController = require('../app/http/controllers/managers/menuController')
const cartController = require('../app/http/controllers/customers/cartController')
const AdminOrderController = require('../app/http/controllers/managers/orderController')
const statusController = require('../app/http/controllers/managers/statusController')

//middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const manager = require('../app/http/middlewares/manager')

function initRoutes(app){
     app.get('/', indexController().index)
     
     app.get('/u_home',auth, homeController().index)
     app.get('/u_hotel', (req,res)=>{
       res.render('customers/u_hotel')
     })
     app.get('/display_menu/:hotelname', homeController().displayMenu)
     app.get('/previous_orders', orderController().displayOrder)
     app.get('/completed_orders', AdminOrderController().completedOrder)
     
     
     app.get('/u_register', authController().register_customer)
     app.post('/u_register', authController().postRegister_customer)
     app.get('/manager_register', authController().register_manager)
     app.post('/manager_register', authController().postRegister_manager)
     app.get('/login',authController().login)
     app.post('/login', authController().postLogin)
     app.post('/logout',authController().logout)
     app.get('/staff', staffController().register_staff)
     app.post('/staff', staffController().postRegister_staff)
     app.get('/staff_list', staffController().displayStaff)

     app.get('/staff_list', staffController().displayStaff)
     
     app.post('/orders',orderController().store)


      app.get('/manager', (req,res)=>{
        res.render('hotel/manager')
      }) 
      
app.get('/managerhome', (req,res)=>{
  res.render('hotel/managerhome')
})
app.get('/staff', (req,res)=>{
  res.render('hotel/staff')
})
app.get('/viewprofile', (req,res)=>{
  res.render('hotel/viewprofile')
})

app.get('/addstaff', (req,res)=>{
  res.render('hotel/addstaff')
})

app.get('/completedorder', (req,res)=>{
  res.render('hotel/completedorder')
})

// app.get('/staff_list', (req,res)=>{
//   res.render('hotel/staff_list')
//  })

app.get('/rawmaterials', (req,res)=>{
  res.render('hotel/rawmaterials')
})

app.get('/menu', menuController().displayMenu)
app.post('/menu', menuController().addMenu)
app.post('/menu/edit', menuController().editMenu)
app.get('/menu/delete/:id', menuController().deleteMenu)
app.get('/staff_list/delete/:id', staffController().deleteStaff)
//app.get('/previous_orders/reorder/:id', orderController().reorder)

app.post('/change_password', userController().changePassword);
app.get('/changePassword', userController().renderchangePassword);



app.get('/cart', cartController().index)
app.post('/update-cart', cartController().update)
app.post('/delete-cart', cartController().delete)
app.get('/cart/delete/:id', cartController().deleteitem)
app.post('/reorder', cartController().reorder)

app.post('/orders', auth, orderController().store)
app.get('/customer/orders', auth, orderController().index)
app.get('/customer/orders/:id', auth, orderController().show)


//Manager routes
app.get('/manager/orders', manager, AdminOrderController().index)
app.post('/manager/order/status', manager, statusController().update)


app.get('/my-orders', (req, res) => {
  res.render('customers/my-orders');
});

app.get('/forgot-password', (req, res) => {
  res.render('auth/forgot-password');
});
app.post('/forgot-password', fController().postForgot)
app.get('/reset-password/:id/:token',  fController().reset)
app.post('/reset-password/:id/:token', fController().postReset)
}

module.exports = initRoutes
