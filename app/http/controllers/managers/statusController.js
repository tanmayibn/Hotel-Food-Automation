const Order = require('../../../models/order')
function statusController() {
    return {
        update(req,res){
            if(req.body.status == 'declined'){
                Order.remove({_id: req.body.orderId}, (err, data) => {
                    if(err){
                        return res.redirect('/manager/orders')
                    }
                    
                    // Emit event 
                    const eventEmitter = req.app.get('eventEmitter')
                    eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })
                    return res.redirect('/manager/orders')
                })
            }else{
                Order.updateOne({_id: req.body.orderId}, {status: req.body.status}, (err, data) => {
                    if(err){
                        return res.redirect('/manager/orders')
                    }
                    
                    // Emit event 
                    const eventEmitter = req.app.get('eventEmitter')
                    eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })
                    return res.redirect('/manager/orders')
                })
            }
            

        }
    }
}

module.exports = statusController