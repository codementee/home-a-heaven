// var myVar = setInterval(reloadPage, 1000);
// const reloadPage = () => {
//     window.location.reload()
// }
// setTimeout(()=>{
//     clearInterval(myVar)
// }, 2000)

const addToCart = document.querySelectorAll('.add-to-cart');
const categoryName = document.querySelector('.category-name');
categoryName.innerText = JSON.parse(localStorage.getItem('categoryArray'));

async function updateCart(e) {
    const cartCounter = document.querySelector('.cart-count');
    // const product = JSON.parse(localStorage.getItem('itemsArray'));
    // console.log(product)
    // const response = await fetch('http://localhost:3333/updateCart', {
    //     method: "post",
    //     mode: 'cors',
    //     credentials: 'include',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         product
    //     })
    // })
    // const result = await response.json();
    
    
    // notyf.success('Item added to cart');
    // cartCounter.innerText = result.totalQty;
}

async function sessionLocalStorage(e){
    const products = document.querySelectorAll('.products')
    const productPrice = document.querySelectorAll('.product-price');
    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
    productPrice.forEach(each => {
        oldItems.push(parseInt(each.innerText))
        localStorage.setItem('priceList', JSON.stringify(oldItems))
    })
        // check if item does not exist in the cart
        //   let cart = product;
        // const response = await fetch('http://localhost:3333/getSessionData')
        // const result = await response.json();
        // const obj = { items: {}, totalQty: 3, totalPrice: 0, }
        localStorage.setItem('obj', JSON.stringify(result))
    }

addToCart.forEach(cartBtn => {
    cartBtn.addEventListener('click', async (e) => {
        let product = await JSON.parse(cartBtn.dataset.product);
        localStorage.setItem('productId', product.product_id)
        let items = {
            item: product
        }
        var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
        localStorage.setItem('itemsArray', JSON.stringify(items));
        for(let i = 0; i < oldItems.length; i++) {
            if((oldItems[i].item.product_id === items.item.product_id)){
                oldItems.push(items);
                localStorage.setItem('itemsArray', JSON.stringify(oldItems));
            }
        }
        // location.replace('/addInCart')
        // }
        // console.log(product.product_id)
        updateCart(e);
    })
})

// {
//     items: {
//         '29': { item: [Object], price: 1000, qty: 1 },
//         '30': { item: [Object], price: 4000, qty: 4 },
//         '31': { item: [Object], price: 4000, qty: 4 }
//     },
//     totalQty: 60,
//     totalPrice: 62600
//   }
// {
//     productid: 30,
//     counterval: 4,
//     price: 4000,
//     cartqty: 35,
//     subtotal: 36800,
//     total: 36800
//   }

//   <%= product.item.product.price * product.qty %>


const logout = document.querySelector('.logout');
// const categoryName = 

logout.addEventListener('click', ()=> {
    location.reload();
    reqByCategory()
    location.reload();
})



// var myVar = setInterval(reloadPage, 200);
// const reloadPage = () => {
    // reqByCategory()
    // location.reload();
    // console.log('helo')
    // window.location.reload()
// }

// setTimeout(()=>{
//     location.reload();
//     reqByCategory()
//     location.reload();
// }, 6000)
// setTimeout(()=>{
    // clearInterval(myVar)
// }, 500)


// setTimeout(()=>{
    reqByCategory()
//     // location.reload();
// }, 200)

async function reqByCategory() {
    // const categoryName = JSON.parse(localStorage.getItem('categoryArray'))
    const response = await fetch('http://localhost:3333/add-data', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            categoryName: JSON.parse(localStorage.getItem('categoryArray')),
        })
    })
    // console.log(response.json())
    // const result = await response.json();
    // console.log(result)
}


// console.log(result)
// console.log(JSON.parse(localStorage.getItem('categoryArray')))

