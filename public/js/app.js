import axios from 'axios'
      let addToCart = document.querySelectorAll('.add-to-cart')

      function updateCart(menuitem){
        axios.post('/update-cart', menuitem).then(res => {
          console.log(res)
        })

      }
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let menuitem = JSON.parse(btn.dataset.menuitem)
        updateCart(menuitem)
        //console.log(menuitem)
    })
})