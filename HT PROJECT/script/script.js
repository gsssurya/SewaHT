feather.replace();
history.replaceState({ page: "home" }, "");
import { products } from '../data/products.js';
import {addCartQuantity, updateCartQuantity, cart} from '../data/cart.js';
import { logoSvg, check, yCart, maps} from '../data/icon.js';
import { kategori, checkNewKategori, renderKategoriHTML } from '../data/kategori.js';
import { loadFirstOpen } from '../interactive/load.js';
import { closeProfileMenu, formatingMoney, closeNavMenu, produkFirstBeforeGo, displayOtherPage, capitalizeFirstLetter,  checkOutPageElement, scrollPaddingTopHTML, popUpElement, blackScreenElement, navbarNav, popUpCheckoutElement, profileElement, blackScreenProfileElement} from '../interactive/interactive.js';
import { summaryCartItem, updateSubTotal} from './checkout.js';
import { item, saveItemLocalStorage } from '../sewa/sewa.js';

// Event Listener start
document.getElementById('map').innerHTML = maps;

document.querySelectorAll('.logo').forEach(el => {
  el.innerHTML = logoSvg;
})
document.querySelector('.js-mulai-sewa-button').addEventListener('click', () => {
  displayOtherPage('flex');
  produkFirstBeforeGo('produk', scrollPaddingTopHTML);
  closeNavMenu();
});

document.querySelector('.js-produk').addEventListener('click', () => {
  displayOtherPage('flex');
  produkFirstBeforeGo('produk', scrollPaddingTopHTML);
  closeNavMenu();
});

document.querySelector('.js-kontak').addEventListener('click', () => {
  displayOtherPage('flex');
  produkFirstBeforeGo('kontak', scrollPaddingTopHTML);
  closeNavMenu();
});

document.querySelector('.js-riwayat').addEventListener('click', () => {
  displayOtherPage('flex');
  produkFirstBeforeGo('riwayat', scrollPaddingTopHTML);
  closeNavMenu();
});

document.querySelector('.js-menu-icon').addEventListener('click', () => {
  navbarNav.classList.remove('hidden');
  blackScreenElement.style.display = 'flex';
  navbarNav.classList.add('show');
  navbarNav.style.display = 'flex';
  document.body.style.overflowY = 'hidden';
});

document.querySelector('.js-close-menu-icon').addEventListener('click', () => {
  closeNavMenu();
});

document.querySelector('.js-black-screen').addEventListener('click', () => {
  closeNavMenu();
});

document.querySelector('.js-shopping-cart').addEventListener('click', () => {
  const tglAmbil1 = document.getElementById('tanggalPengambilan').value;
  const tglKembali2 = document.getElementById('tanggalPengembalian').value;
  document.querySelector('html').style.scrollBehavior = 'auto';
  summaryCartItem();
  if(getComputedStyle(checkOutPageElement).display === 'none'){
    history.pushState({ page: "shopping-cart" }, "");
    const navbar = document.getElementById("navbar");
    const heroPageElement = document.querySelector('.hero');
    displayOtherPage('none');
    checkOutPageElement.style.display = 'flex';
    heroPageElement.style.display = 'none';
    navbar.style.backgroundColor = `rgba(28, 59, 55)`;
    window.scrollTo(0, 0);
  } else {
    displayOtherPage('flex');
    history.pushState({ page: "home" }, "");
  }
  if (tglAmbil1 && tglKembali2 && cart.length > 0) {
      updateSubTotal();
    }
});

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

document.querySelector('.js-profile-icon').addEventListener('click', () => {
  profileElement.classList.remove('profile-hidden');
  profileElement.style.display = 'flex';
  profileElement.classList.add('show-profile');
  document.body.style.overflowY = 'hidden';
  blackScreenProfileElement.style.display = 'block';
});

document.querySelector('.js-close-profile').addEventListener('click', () => {
  closeProfileMenu();
});

blackScreenProfileElement.addEventListener('click', () => {
  closeProfileMenu();
});

window.addEventListener("popstate", (event) => {
  const state = event.state;
  if (!state || state.page === "home") {
    displayOtherPage('flex');
    const heroPageElement = document.querySelector('.hero');
    heroPageElement.style.display = 'none';
  }

  if (state?.page === "shopping-cart") {
    const navbar = document.getElementById("navbar");
    const heroPageElement = document.querySelector('.hero');
    displayOtherPage('none');
    checkOutPageElement.style.display = 'flex';
    heroPageElement.style.display = 'none';
    navbar.style.backgroundColor = `rgba(28, 59, 55)`;
    window.scrollTo(0, 0);
  }
});
// Event Listener end


// Run function start
loadFirstOpen();
checkNewKategori(products);
renderKategoriHTML(capitalizeFirstLetter);
summaryCartItem();
updateCartQuantity();
// Run function end


// Script for products start
kategori.forEach((kat) => {
  let contentHTML = '';
  products.forEach((product) => {
    if(product.kategori === kat){
      contentHTML += `
        <div class="produk-detail" id="detailProduk">
          <img
          id="gambarProduk"
          src="${product.image}"
          alt="${product.nama}"
          loading="lazy"
          />
          <div class="deskripsi">
          <h1 id="namaProduk">${product.nama}</h1>
          <a id="sewaProduk" class="js-action-sewa" data-product-id = "${product.id}">Sewa</a>
          </div>
          <p id="stokProduk">Tersedia : ${product.tersedia}</p>
          <p id="hargaProduk">Rp ${formatingMoney(product.harga)}/24 jam</p>
          <a class="yelCart js-sewa-produk" data-product-id = "${product.id}" id="yCart">${yCart}</a>
          <a class="added-to-cart added-to-cart-${product.id}">${check}</a>
        </div>
      `;
    }
  });
  document.querySelector(`.js-produk-list-${kat}`).innerHTML = contentHTML;
});

document.querySelectorAll('.js-action-sewa').forEach((button) => {
  button.addEventListener('click', () => {
    const idItem = button.dataset.productId;
    console.log(idItem)
    if(item.length === 0){
        item.push({
        productId: idItem,
        quantity: 1
      })
    } else {
      item[0].productId = idItem;
      item[0].quantity = 1;
    }
    saveItemLocalStorage();
    window.location.href = "../sewa/index.html";
  })
})

const cartQuantityElement = document.querySelector('.js-amount-cart');
if(cartQuantityElement.innerHTML != '0'){
  cartQuantityElement.style.opacity = '1';
}
document.querySelectorAll('.js-sewa-produk').forEach((button) => {
  button.addEventListener('click', () => {

    const productId = button.dataset.productId;
    document.querySelectorAll(`.added-to-cart-${productId}`).forEach((cartCheck) => {
      cartCheck.classList.add('added-to-cart-show');

      setTimeout(() => {
        cartCheck.classList.remove('added-to-cart-show');
      }, 825);
    });

    addCartQuantity(productId);
    updateCartQuantity();
  });
});
// Script for products end


