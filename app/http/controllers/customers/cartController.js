function cartController(){
    return {
        //read
        index(req,res) {
            res.render('customers/cart')
        },
        update(req,res){
            /*
            let cart = {
                items: {
                    itemId: { item: Object, qty:0},
                },
                totalQty: 0,
                totalPrice: 0
            }*/
            //for first time,creating cart
            if(!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart

            //check if item doesn't exist in cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1,
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            return res.json({ totalQty: req.session.cart.totalQty})
        },
        async delete(req,res){

                let cart = req.session.cart
                cart.totalQty = cart.totalQty - cart.items[req.body._id].qty
                cart.totalPrice = cart.totalPrice - cart.items[req.body._id].qty * req.body.price
                await delete cart.items[req.body._id]
                console.log(req.session.cart)
               // return res.json({ totalQty: req.session.cart.totalQty})

                return res.redirect('/cart')

        },
        async deleteitem(req,res){

            let cart = req.session.cart
            cart.totalQty = cart.totalQty - cart.items[req.params.id].qty
            cart.totalPrice = cart.totalPrice - cart.items[req.params.id].qty * cart.items[req.params.id].item.price
            await delete cart.items[req.params.id]
            console.log(req.session.cart)
           // return res.json({ totalQty: req.session.cart.totalQty})

            return res.redirect('/cart')

    },
    reorder(req,res){
        /*
        let cart = {
            items: {
                itemId: { item: Object, qty:0},
            },
            totalQty: 0,
            totalPrice: 0
        }*/
        //for first time,creating cart
        if(!req.session.cart){
            req.session.cart = {
                items: {},
                totalQty: 0,
                totalPrice: 0
            }
        }
        let cart = req.session.cart
        items = req.body
        for (const id in items) {
            item = items[id].item
            //check if item doesn't exist in cart
            if(!cart.items[item._id]){
                cart.items[item._id] = {
                    item: item,
                    qty: items[id].qty,
                }
                cart.totalQty = cart.totalQty + items[id].qty
                cart.totalPrice = cart.totalPrice + items[id].qty*item.price
            } else {
                cart.items[item._id].qty = cart.items[item._id].qty + items[id].qty
                cart.totalQty = cart.totalQty + items[id].qty
                cart.totalPrice = cart.totalPrice + items[id].qty*item.price
            }
          }
        
        return res.json({ totalQty: req.session.cart.totalQty})
    },
    }
}

module.exports = cartController