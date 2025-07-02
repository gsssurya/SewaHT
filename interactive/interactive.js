export const checkOutPageElement = document.querySelector('.js-checkout-page');
export const scrollPaddingTopHTML = parseInt(getComputedStyle(document.documentElement).getPropertyValue('scroll-padding-top'));
export const popUpElement = document.querySelector('.js-popUp');
export const blackScreenElement = document.querySelector('.js-black-screen');
export const navbarNav = document.querySelector('.js-navbar');
export const popUpCheckoutElement = document.querySelector(".pop-up-checkout-container");
export const profileElement = document.querySelector('.user-container');
export const blackScreenProfileElement = document.querySelector('.js-black-screen-profile');

export function closeProfileMenu(){
  profileElement.classList.remove('show-profile');
  profileElement.classList.add('profile-hidden');
  blackScreenProfileElement.style.display = 'none';
  document.body.style.overflowY = 'scroll';
};

export function closeNavMenu(){
  navbarNav.classList.add('hidden');
  navbarNav.classList.remove('show');
  blackScreenElement.style.display = 'none';
  document.body.style.overflowY = 'scroll';
};

export function hiddenHeroPage(targetId, padding) {
  backgroundColorHeader();
  const onScroll = () => {
    const produk = document.getElementById(targetId);
    const rect = produk.getBoundingClientRect();
    if (Math.round(rect.top) <= padding) {
      window.removeEventListener('scroll', onScroll);
      setTimeout(() => {
        document.querySelector('.hero').style.display = 'none';
        console.log('lol');
      }, 50);
    }
  };
  window.addEventListener('scroll', onScroll);
};

export function produkFirstBeforeGo(element, padding){
  document.querySelector('html').style.scrollBehavior = 'smooth';
  backgroundColorHeader();
  document.documentElement.style.setProperty('scroll-padding-top', `0px`);
  document.getElementById('produk').scrollIntoView({ behavior: 'smooth'});
  const heroElement = document.querySelector('.hero');
  if(window.getComputedStyle(heroElement).display === 'flex'){
    const onScroll = () => {
      const produk = document.getElementById('produk');
      const rect = produk.getBoundingClientRect();
      if (element === 'produk'){
        if (Math.round(rect.top) === 0) {
            window.scrollTo(0, 0);
            heroElement.style.display = 'none';
            window.removeEventListener('scroll', onScroll);
        }
      } else {
        if (Math.round(rect.top) === 0) {
          heroElement.style.display = 'none';
          window.removeEventListener('scroll', onScroll);
          setTimeout(() => {
            document.documentElement.style.setProperty('scroll-padding-top', `${padding}px`);
            document.getElementById(element).scrollIntoView({ behavior: 'smooth'});
          }, 5);
          window.scrollTo(0, 0);
        }
      }
    }
    window.addEventListener('scroll', onScroll);
  } else {
    setTimeout(() => {
      document.documentElement.style.setProperty('scroll-padding-top', `${padding}px`);
      document.getElementById(element).scrollIntoView({ behavior: 'smooth'});
    }, 25);
  };  
};

export function backgroundColorHeader(){
  const navbar = document.getElementById("navbar");
  window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(scrollY / vh, 1);
      const opct = 0.75 + progress;
      if(window.getComputedStyle(document.querySelector('.hero')).display === 'flex'){
        navbar.style.backgroundColor = `rgba(28, 59, 55, ${opct})`;
      } else {
        navbar.style.backgroundColor = `rgba(28, 59, 55)`;
        return;
      }
    });
};

export function displayOtherPage(display){
  const produkElement = document.querySelector('.js-produk-page');
  const kontakElement = document.querySelector('.js-kontak-page');
  const riwayatElement = document.querySelector('.js-riwayat-page');
  const footerElement = document.querySelector('.js-footer-page');
  produkElement.style.display = display;
  kontakElement.style.display = display;
  riwayatElement.style.display = display;
  footerElement.style.display = display;
  checkOutPageElement.style.display = 'none';
};

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}