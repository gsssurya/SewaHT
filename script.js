//Menampilkan menu
const menu = document.getElementById("menu");
const nav = document.getElementById("navbar-nav")
const close = document.getElementById("close")

menu.addEventListener("click", function(){
  nav.style.right = "0"
})
close.addEventListener("click", function(){
  nav.style.right = "-1000px"
})