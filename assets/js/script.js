// OPEN & CLOSE CART
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#cart-close');
const btnNav = document.querySelector('.bars-right .bars');
const eye = document.querySelectorAll('.eye');
const detail = document.querySelector('.detail');

btnNav.addEventListener('click', () => {
    const ulNav = document.querySelector('.navbar');
    ulNav.classList.toggle('aktif');
});

cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
});

eye.forEach(e => {
    e.addEventListener('click', () => {
        // let detailP = detailProduct();
        // console.log(detailP);
        // document.body.appendChild(detailProduct);
        // detail.classList.add('fixed');
        detail.classList.add('fixed');
        document.body.style.overflow = 'hidden';
        // detail.style.transition = 'all 0.3s';
    });
});

// Start when the document is ready
if(document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}

//======================= START =======================
function start() {
    addEvents();
}





//======================= UPDATE & RERENDER =======================
function update() {
    addEvents();
    updateTotal();
}




//======================= UPDATE & RERENDER =======================
function addEvents() {
    // Remove items from cart
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    cartRemove_btns.forEach(btn => {
        btn.addEventListener('click', handle_removeCartItem);
    });
    // Change item quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
        input.addEventListener('change', handle_changeItemQuantity);
    });

    // Add item to cart
    let addCart_btns = document.querySelectorAll('.button-product .add-cart');
    addCart_btns.forEach(btn => {
        btn.addEventListener('click', handle_addCartItem);
        // btn.addEventListener('click', handle_addCartItem);
    });

    // Buy Order
    const buy_btn = document.querySelector('.btn-buy');
    buy_btn.addEventListener('click', handle_buyOrder);
}





let itemsAdded = [];
//======================= HANDLE EVENTS FUNCTION =======================
function handle_addCartItem() {
    let product = this.parentElement.parentElement;
    let title = product.querySelector('.product-title').innerHTML;
    let price = product.querySelector('.product-price').innerHTML;
    let imgSrc = product.querySelector('.product-img').src;
    console.log(title, price, imgSrc);
    
    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // handle item is already exist
    if(itemsAdded.find(el => el.title == newToAdd.title)){
        alert("This Item is Already Exist!");
        return;
    } else {
        itemsAdded.push(newToAdd);
    }

    // Add item to cart

    // Add product to cart
    let cartBoxElement = CartBoxComponent(title, price, imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);
    update();
}

function handle_removeCartItem() {
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter(el => el.title != this.parentElement.querySelector('.cart-product-title').innerHTML);

    update();
}

function handle_changeItemQuantity() {
    if(isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value); // to keep it integer

    update();
}


function handle_buyOrder() {
    if(itemsAdded.length <= 0) {
        alert('There is No Order to Place Yet! \n Please Make an Order first');
        return;
    }
    const cartContent = cart.querySelector('.cart-content');
    cartContent.innerHTML = '';
    alert('Your Order is Placed Successfully :)');
    itemsAdded = [];

    update();
}

//======================= UPDATE & RERENDER FUNCTIONS =======================
function updateTotal() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0;
    cartBoxes.forEach(cartBox => {
        let priceElement = cartBox.querySelector('.cart-price');
        let price = priceElement.innerHTML.replace('Rp.', '').replace('.', '');
        let quantity = cartBox.querySelector('.cart-quantity').value;
        total += price * quantity;
    });
    total = Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total);
    totalElement.innerHTML = total; 
}



//======================= HTML COMPONENTS =======================
function CartBoxComponent(title, price, imgSrc) {
    return `
    <div class="cart-box">
    <img src="${imgSrc}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- REMOVE CART -->
    <i class='bx bxs-trash-alt cart-remove'></i>
</div>`;
}

// function detailProduct() {
//     return `
//     <div class="detail">
//         <div class="container-detail">
//             <div class="container-image">
//                 <div class="content-image">
//                     <img src="assets/img/product1.webp" alt="" class="detail-image">
//                 </div>
//             </div>
//             <div class="container-title">
//                 <div class="content-title">
//                     <h2 class="title">T-shirt Muhammad Ali // Morrow</h2>
//                     <!-- <h4 class="semi-title">men's sport</h4> -->
//                     <p class="detail-paragraf">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quae nihil eos incidunt eligendi consequuntur reprehenderit asperiores obcaecati voluptas possimus accusantium aut, labore, temporibus vero quia distinctio omnis ab molestias maxime nesciunt, nam est adipisci! Quos inventore dolorum hic iusto.</p>
//                     <h2 class="detail-price">Rp. 125.000</h2>
//                     <a href="#" class="button-detail">add to cart</a>
//                 </div>
//             </div>
//         </div>
//     </div>`
// }


// function shopProductComponent() {
//     fetch('assets/product/product.json')
//     .then(response => response.json())
//     .then(response => {
//         const shopContent = document.querySelector('.shop-content');
//         let productContent = '';
//         response.forEach(p => {
//             productContent += `<div class="product-box">
//                         <img src="${p.image}" alt="" class="product-img">
//                         <h2 class="product-title">${p.name}</h2>
//                         <span class="product-price">${p.price}</span>
//                         <i class='bx bx-shopping-bag add-cart'></i>
//                     </div>`;
//         });
//         shopContent.innerHTML = productContent;
//     });
// }
// shopProductComponent();