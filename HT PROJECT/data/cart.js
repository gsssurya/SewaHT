export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addCartQuantity(productId) {
    let matchingItem;
    cart.forEach((item) => {
      if(productId === item.productId){
        matchingItem = item;
      }
    });

    if(matchingItem){
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId,
        quantity: 1
      })
    }
    saveCartToLocal();
}

export function updateCartQuantity(){
  const cartQuantityElement = document.querySelector('.js-amount-cart');
  let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    })
    document.querySelector('.js-amount-cart').innerHTML = cartQuantity;
    if(cartQuantity < 1){
      cartQuantityElement.style.opacity = '0';
    } else {
      cartQuantityElement.style.opacity = '1';
    }
    if (cart.length === 0){
      document.querySelector('.js-cart-item-container')
       .innerHTML = '<p class="messageCartEmpty">Keranjang Anda kosong!</p>';
      const button = document.querySelector('.js-checkout-popup-button');
      document.querySelector('.js-sub-total-element').innerHTML = '-';
      button.classList.add('checkout-button');
      button.classList.remove('hitung-sukses');
    }
}


export function deleteItem(productId){
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId != productId){
        newCart.push(cartItem);
    }
  })
  cart = newCart;
  saveCartToLocal();
}

export function saveCartToLocal(){
  localStorage.setItem('cart', JSON.stringify(cart));
}