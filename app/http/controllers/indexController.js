function indexController(){
    return {
        //read
        index(req,res) {
            res.render('index')
        }
    }
}

module.exports = indexController