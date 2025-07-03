import {cart, deleteItem, updateCartQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { deleteIcon } from '../data/icon.js';
import { formatingMoney } from '../interactive/interactive.js';

export function summaryCartItem() {
  let cartSummaryHTML = '';

  [...cart].reverse().forEach((cartItem) => {
    let matchingItem;
    products.forEach((product) => {
      if(cartItem.productId == product.id){
        matchingItem = product;
      }
    })
    
    cartSummaryHTML += `
      <div class="item-detail js-cart-item-container-${matchingItem.id}">
        <div class="nama-item js-nama-item">
          <a class="js-delete-icon-button" data-product-id="${matchingItem.id}">${deleteIcon}</a>
          <div class="image-produk">
            <img src="${matchingItem.image}" alt="">
          </div>
          <p>${matchingItem.nama}</p>
        </div>
        <div class="harga-phoneDisplay">Harga/24 jam</div>
        <p class="harga-item">
          Rp ${(matchingItem.harga / 1000).toFixed(3)}</p>
        <div class="jumlah-item-container">
          <a class="js-minus-cart-item" data-product-id="${matchingItem.id}">-</a>
          <p>${cartItem.quantity}</p>
          <a class="js-add-more-item" data-product-id="${matchingItem.id}">+</a>
        </div>
        <p class="total-harga-item">
          Rp ${formatingMoney(matchingItem.harga * cartItem.quantity)}
        </p>
      </div>
    `;
  })
  if(cart.length === 0){
    document.querySelector('.js-cart-item-container')
    .innerHTML = '<p class="messageCartEmpty">Keranjang Anda masih kosong!</p>';
  } else {
    document.querySelector('.js-cart-item-container')
    .innerHTML = cartSummaryHTML;
  }
  
  adjustQuantity();
  deleteCartItem();
}

export function adjustQuantity(){
  document.querySelectorAll('.js-add-more-item').forEach((plusButton) => {
    plusButton.addEventListener('click', () => {
        const productId = plusButton.dataset.productId;
        cart.forEach((cartItem) => {
            if(cartItem.productId == productId){
            cartItem.quantity += 1
            }
        })
        summaryCartItem();
        updateCartQuantity()
    })
  })

  document.querySelectorAll('.js-minus-cart-item').forEach((plusButton) => {
    plusButton.addEventListener('click', () => {
        const productId = plusButton.dataset.productId;
        cart.forEach((cartItem) => {
            if(cartItem.productId == productId){
                if(cartItem.quantity != 1){
                    cartItem.quantity --
                }
            }
        })
        summaryCartItem();
        updateCartQuantity()
    })
  })
} 


export function deleteCartItem(){
  document.querySelectorAll(`.js-delete-icon-button`).forEach((button) => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        deleteItem(productId);
        const element = document.querySelector(`.js-cart-item-container-${productId}`)
        element.remove();
        updateCartQuantity()
    })
  })
}