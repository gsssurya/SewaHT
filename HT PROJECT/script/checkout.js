import {cart, deleteItem, updateCartQuantity, saveCartToLocal} from '../data/cart.js';
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
          Rp ${formatingMoney(matchingItem.harga)}</p>
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

let hitungSukses = false;
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
        saveCartToLocal();
        if(hitungSukses){
          updateSubTotal();
        }
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
        saveCartToLocal();
        if(hitungSukses){
          updateSubTotal();
        }
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
        updateCartQuantity();
        if (tglAmbil1.value && tglKembali2.value && cart.length > 0) {
        updateSubTotal();
    }
    })
  })
}


function selisihTanggal( tglAmbil, tglKembali){
  const tanggal1 = new Date(`${tglAmbil}`);
  const tanggal2 = new Date(`${tglKembali}`);

  tanggal1.setHours(0, 0, 0, 0);
  tanggal2.setHours(0, 0, 0, 0);

  const selisihMs = tanggal2 - tanggal1;
  const selisihHari = selisihMs / (1000 * 60 * 60 * 24);

  return selisihHari;
}


// Tanggal sewa
const today = new Date().toLocaleDateString('sv-SE');
const tglAmbil1 = document.getElementById('tanggalPengambilan');
const tglKembali2 = document.getElementById('tanggalPengembalian');
tglAmbil1.setAttribute('min', today);
tglKembali2.setAttribute('min', today);
let timeOn;

export function updateSubTotal(){
  if(timeOn){
    clearTimeout(timeOn);
  }
  const tglAmbil = tglAmbil1.value;
  const tglKembali = tglKembali2.value;
  const button = document.querySelector('.js-checkout-popup-button');
  if (tglAmbil && tglKembali){
      const selisihTgl = selisihTanggal(tglAmbil, tglKembali);
      let subTotal = 0;
      cart.forEach((cartItem) => {
        let matchingItem;
        products.forEach((product) => {
          if(cartItem.productId == product.id){
            matchingItem = product;
          }
        })
        subTotal += (matchingItem.harga * cartItem.quantity) * selisihTgl;
      })
      if(subTotal == 0){
        if(cart.length === 0){
          document.querySelector('.js-atention').innerHTML = `Tambahkan item terlebih dahulu!`;
        } else {
          document.querySelector('.js-atention').innerHTML = `Minimal penyewaan 1 hari!`;
          document.querySelector('.js-sub-total-element').innerHTML = '-';
          hitungSukses = false;
        }
      } else if(subTotal < 0){
        if(cart.length == 0){
          document.querySelector('.js-atention').innerHTML = `Tambahkan item terlebih dahulu!`;
        } else {
          document.querySelector('.js-atention').innerHTML = `Tanggal tidak valid!`;
          document.querySelector('.js-sub-total-element').innerHTML = '-';
          hitungSukses = false;
        }
      }else {
        document.querySelector('.js-atention').innerHTML = ` `;
        button.classList.remove('checkout-button');
        button.classList.add('hitung-sukses');
        button.innerHTML = 'Checkout'
        document.querySelector('.js-sub-total-element').innerHTML = `Rp ${formatingMoney(subTotal)}`;
        hitungSukses = true;
      }
  } else {
    if(cart.length === 0){
      document.querySelector('.js-atention').innerHTML = `Tambahkan item terlebih dahulu!`;
    } else {
      document.querySelector('.js-atention').innerHTML = `Tanggal sewa belum lengkap!`;
    }
  }
  timeOn = setTimeout(() => {
    document.querySelector('.js-atention').innerHTML = ` `;
  }, 2000);
}

document.querySelectorAll('.date').forEach((date) => {
    date.addEventListener('change', () => {
    const button = document.querySelector('.js-checkout-popup-button');
    document.querySelector('.js-sub-total-element').innerHTML = '-';
    button.classList.add('checkout-button');
    button.classList.remove('hitung-sukses');
    hitungSukses = false;
    if (tglAmbil1.value && tglKembali2.value) {
      updateSubTotal();
    }
  })
})

document.querySelector('.js-ambil-date').addEventListener('click', () => {
  document.querySelector('.js-ambil-date').showPicker?.();
});

document.querySelector('.js-kembali-date').addEventListener('click', () => {
  document.querySelector('.js-kembali-date').showPicker?.();
});

