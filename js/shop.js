// Funkcija za čitanje kategorije iz query stringa
function getCategoryFromQueryString() {
  const params = new URLSearchParams(window.location.search); // Kreiranje URLSearchParams objekta
  return params.get("category"); // Dobavljanje vrijednosti parametra "category"
}
// Funkcija za dobavljanje proizvoda sa servera
async function getProducts() {
  const response = await fetch("https://api.advanziaeducation.com/api/products", {
    method: "GET", // GET zahtev
    headers: {
      "X-API-Key": "Your_API_Key" // API ključ u headeru
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json(); // Obrada odgovora kao JSON
}
// Funkcija za prikaz proizvoda u HTML-u
function renderProducts(products) {
  const container = document.getElementById("productsContainer");
  container.innerHTML = ""; // Čisti prethodni sadržaj

  if (products.length === 0) {
    container.innerHTML = "<p class='empty-state'>No products found for this category.</p>";
    return;
  }
   // Generisanje HTML-a za svaki proizvod
  products.forEach((product) => {
    container.innerHTML += `
      <article class="product-card">
        <img class="product-img" src="images/${product.id}.jpg" alt="${product.title}">
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">${product.price} €</p>
          <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">Add to Cart</button>
        </div>
      </article>
    `;
  });
}
// Glavna funkcija za inicijalizaciju stranice
async function initShopPage() {
  const selectedCategory = getCategoryFromQueryString();  // Čitanje kategorije
  const container = document.getElementById("productsContainer"); 
  console.log(selectedCategory); // Provjera vrijednosti kategorije

  if (!selectedCategory) {
    container.innerHTML = "<p class='empty-state'>No category selected.</p>";
    return;
  }
  // Try-catch blok za hvatanje grešaka
  try {
    const products = await getProducts();
     console.log("All products:", products); // Provjera strukture podataka
    // Filtriranje proizvoda
    const filteredProducts = products.filter((product) =>
      // Poređenje kategorija sa toLowerCase()
      product.category.toLowerCase().startsWith(selectedCategory.toLowerCase())
    );

    console.log("Filtered products:", filteredProducts); // Provjera filtriranih proizvoda
    renderProducts(filteredProducts);
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p class='empty-state'>Unable to load products.</p>";
  }
}
// Pokretanje inicijalizacije stranice
initShopPage();
