// OPEN & CLOSE CART
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#cart-close');
const btnNav = document.querySelector('.bars-right .bars');
const eye = document.querySelectorAll('.eye');
const detailProductParent = document.querySelector('.detail');



btnNav.addEventListener('click', () => {
    const ulNav = document.querySelector('.navbar');
    ulNav.classList.toggle('aktif');
});

cartIcon.addEventListener('click', () => {
    cart.classList.toggle('active');
});

closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
});

// eye.forEach(e => {
//     e.addEventListener('click', () => {
//         detailProductParent.classList.add('fixed');
//     });
// });




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
    // handle_addDetailItem();
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
    let addCart_btns = document.querySelectorAll('.add-cart');
    addCart_btns.forEach(btn => {
        btn.addEventListener('click', handle_addCartItem);
    });

    // add item to detail item
    const eye = document.querySelectorAll('.eye');
    eye.forEach(e => {
        e.addEventListener('click', handle_addDetailItem);
    });

    

    // Buy Order
    const buy_btn = document.querySelector('.btn-buy');
    buy_btn.addEventListener('click', handle_buyOrder);
}

function getProductData(product) {
    let title = product.querySelector('.product-title').innerHTML;
    let price = product.querySelector('.product-price').innerHTML;
    let imgSrc = product.querySelector('.product-img').src;

    return {
        title,
        price,
        imgSrc
    };
}




let itemsAdded = [];
//======================= HANDLE EVENTS FUNCTION =======================
function handle_addCartItem() {
    let product = this.parentElement.parentElement;
    let productData = getProductData(product);

    let newToAdd = {
        title: productData.title,
        price: productData.price,
        imgSrc: productData.imgSrc,
    };

    // handle item is already exist
    if(itemsAdded.find(el => el.title == newToAdd.title)){
        alert("This Item is Already Exist!");
        return;
    } else {
        itemsAdded.push(newToAdd);
    }
    
    // Add product to cart
    let cartBoxElement = CartBoxComponent(newToAdd.title, newToAdd.price, newToAdd.imgSrc);
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

function handle_addDetailItem() {
    detailProductParent.classList.add('fixed');
    let product = this.parentElement.parentElement;
    let productData = getProductData(product);
    let newNodeDetail = document.createElement('div');
    newNodeDetail.innerHTML = detailProduct(productData.title, productData.price, productData.imgSrc);
    detailProductParent.appendChild(newNodeDetail);

    const kembali = document.querySelectorAll('.kembali');
    kembali.forEach(k => {
        k.onclick = (e) => {
            detailProductParent.classList.remove('fixed');
            detailProductParent.removeChild(newNodeDetail);
            e.preventDefault();
        };
    });
    
    window.onclick = (e) => {
        if(e.target === detailProductParent) {
            detailProductParent.classList.remove('fixed');
            detailProductParent.removeChild(newNodeDetail);
        };
    };
    const buttonDetail = document.querySelectorAll('.button-detail');
    buttonDetail.forEach(bd => {
        bd.addEventListener('click', function() {
            let cartBoxElement = CartBoxComponent(productData.title, productData.price, productData.imgSrc);
            let newNode = document.createElement("div");
            newNode.innerHTML = cartBoxElement;
            const cartContent = cart.querySelector(".cart-content");
            cartContent.appendChild(newNode);
            update();

        });
    }); 
    // handle_addProductDetail();
    update();
}

// function handle_addProductDetail() {
//     let product = this.parentElement.parentElement;
//     console.log(product);
// }

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

function detailProduct(title, price, imgSrc) {
    return `
        <div class="container-detail">
            <div class="container-image">
                <div class="content-image">
                    <img src="${imgSrc}" alt="" class="detail-image">
                </div>
            </div>
            <div class="container-title">
                <div class="content-title">
                    <a href="#" class="kembali">kembali</a>
                    <h2 class="title">${title}</h2>
                    <p class="detail-paragraf">Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quae nihil eos incidunt eligendi consequuntur reprehenderit asperiores obcaecati voluptas possimus accusantium aut, labore, temporibus vero quia distinctio omnis ab molestias maxime nesciunt, nam est adipisci! Quos inventore dolorum hic iusto.</p>
                    <h2 class="detail-price">${price}</h2>
                    <a href="#" class="button-detail">add to cart</a>
                </div>
            </div>
        </div>`
}
