// Selektovanje dugmadi za kategoriju pomoću getElementById
// Promenljive
const womenBtn = document.getElementById("womenBtn");
const kidsBtn = document.getElementById("kidsBtn");
const menBtn = document.getElementById("menBtn");

// Dodavanje click event listenera na dugmad
womenBtn.addEventListener("click", function () {
// Preusmjeravanje na shop.html sa query string parametrom
  window.location.href = "shop.html?category=women"; // Za kategoriju "Women"
});

kidsBtn.addEventListener("click", function () {
  window.location.href = "shop.html?category=kids"; // Za kategoriju "Kids"
});

menBtn.addEventListener("click", function () {
  window.location.href = "shop.html?category=men"; // Za kategoriju "Men"
});