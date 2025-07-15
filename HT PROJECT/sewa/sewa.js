feather.replace();
import { products } from "../data/products.js";
import { deleteIcon } from "../data/icon.js";
import { formatingMoney } from "../interactive/interactive.js";
const popUpElement = document.querySelector('.js-popUp');
const popUpCheckoutElement = document.querySelector(".pop-up-checkout-container");

export let item = JSON.parse(localStorage.getItem('item')) || []

if(item.length != 0){
    summaryCartItem();

function summaryCartItem() {
  let cartSummaryHTML = '';

  item.forEach((cartItem) => {
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
            <img src="../${matchingItem.image}" alt="">
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
    document.querySelector('.js-cart-item-container')
    .innerHTML = cartSummaryHTML;
    updateQuantity();
    deleteItem();
}

function updateQuantity(){
    document.querySelector('.js-add-more-item').addEventListener('click', () => {
        item[0].quantity += 1;
        summaryCartItem(); 
        if (tglAmbil1.value && tglKembali2.value) {
      updateSubTotal();
    }
    })
    document.querySelector('.js-minus-cart-item').addEventListener('click', () => {
        if(item[0].quantity > 1){
            item[0].quantity -= 1;
            summaryCartItem();
            if (tglAmbil1.value && tglKembali2.value) {
      updateSubTotal();
    }
        }
    })
}

const today = new Date().toLocaleDateString('sv-SE');
const tglAmbil1 = document.getElementById('tanggalPengambilan');
const tglKembali2 = document.getElementById('tanggalPengembalian');
tglAmbil1.setAttribute('min', today);
tglKembali2.setAttribute('min', today);
let timeOn;

function selisihTanggal( tglAmbil, tglKembali){
  const tanggal1 = new Date(`${tglAmbil}`);
  const tanggal2 = new Date(`${tglKembali}`);

  tanggal1.setHours(0, 0, 0, 0);
  tanggal2.setHours(0, 0, 0, 0);

  const selisihMs = tanggal2 - tanggal1;
  const selisihHari = selisihMs / (1000 * 60 * 60 * 24);

  return selisihHari;
}

if(document.querySelector('.js-ambil-date-2')){
  document.querySelector('.js-ambil-date-2').addEventListener('click', () => {
  document.querySelector('.js-ambil-date-2').showPicker?.();
});

document.querySelector('.js-kembali-date-2').addEventListener('click', () => {
  document.querySelector('.js-kembali-date-2').showPicker?.();
});
}


function updateSubTotal(){
  if(timeOn){
    clearTimeout(timeOn);
  }
  const tglAmbil = tglAmbil1.value;
  const tglKembali = tglKembali2.value;
  const button = document.querySelector('.js-checkout-popup-button');
  if (tglAmbil && tglKembali){
      const selisihTgl = selisihTanggal(tglAmbil, tglKembali);
      let subTotal = 0;
      item.forEach((cartItem) => {
        let matchingItem;
        products.forEach((product) => {
          if(cartItem.productId == product.id){
            matchingItem = product;
          }
        })
        subTotal += (matchingItem.harga * cartItem.quantity) * selisihTgl;
      })
      if(subTotal == 0){
        if(item.length === 0){
          document.querySelector('.js-atention').innerHTML = `Tambahkan item terlebih dahulu!`;
        } else {
          document.querySelector('.js-atention').innerHTML = `Minimal penyewaan 1 hari!`;
          document.querySelector('.js-sub-total-element').innerHTML = '-';
        }
      } else if(subTotal < 0){
        if(item.length == 0){
          document.querySelector('.js-atention').innerHTML = `Tambahkan item terlebih dahulu!`;
        } else {
          document.querySelector('.js-atention').innerHTML = `Tanggal tidak valid!`;
          document.querySelector('.js-sub-total-element').innerHTML = '-';
        }
      }else {
        document.querySelector('.js-atention').innerHTML = ` `;
        button.classList.remove('checkout-button');
        button.classList.add('hitung-sukses');
        button.innerHTML = 'Checkout'
        document.querySelector('.js-sub-total-element').innerHTML = `Rp ${formatingMoney(subTotal)}`;
      }
  } else {
    if(item[0].length === 0){
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
    if (tglAmbil1.value && tglKembali2.value) {
      updateSubTotal();
    }
  })
})

document.querySelector('.js-checkout-popup-button').addEventListener('click', () => {
  const hitungDone = document.querySelector('.hitung-sukses');
  if(hitungDone){
      popUpCheckoutElement.style.display = 'flex';
      document.body.style.overflowY = 'hidden';
      popUpElement.classList.add('pop-up-show');
  }
  updateSubTotal();
});

document.querySelector('.js-close-pop-up-checkout').addEventListener('click', () => {
  popUpCheckoutElement.style.display = 'none';
  document.body.style.overflowY = 'scroll';
  popUpElement.classList.remove('pop-up-show');
});
}

export function saveItemLocalStorage(){
    localStorage.setItem('item', JSON.stringify(item))
}

function deleteItem(){
    document.querySelector('.js-delete-icon-button').addEventListener('click', () => {
    item = []
    saveItemLocalStorage()
    window.location.href = "../index.html";
})
}

export function deleteItemSec(){
  item = []
  saveItemLocalStorage()
}