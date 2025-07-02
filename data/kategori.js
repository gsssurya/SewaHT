export const kategori = [];

export function checkNewKategori(products) {
    products.forEach((item) => {
    if (!kategori.includes(item.kategori)){
        kategori.push(item.kategori);
    }
});
}

export function renderKategoriHTML(capitalizeFirstLetter){
  let kategoriHTML = ``;
  kategori.forEach((kat) => {
    kategoriHTML += `
      <div class="kategori-box" id="kategoriProduk">
          <p id="namaKategori">${capitalizeFirstLetter(kat)}</p>
          <div class="produk-list js-produk-list-grid js-produk-list-${kat}" id="listProduk">
          </div>
        </div>
    `;
    document.querySelector('.js-produk-page').innerHTML = kategoriHTML;
  });
}