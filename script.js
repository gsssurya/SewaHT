const menu = document.getElementById("menu");
const nav = document.getElementById("navbar-nav");
const close = document.getElementById("close");
const black_screen = document.getElementById("black-screen")

//Menampilkan menu
menu.addEventListener("click", function(){
  nav.style.right = "0"
  black_screen.style.display = "block"
  
});
//Menutup menu
close.addEventListener("click", function(){
  nav.style.right = "-1000px"
  black_screen.style.display = "none"
});

black_screen.addEventListener("click", function(){
  nav.style.right = "-1000px"
  black_screen.style.display = "none"
})