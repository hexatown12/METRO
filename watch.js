const wishlistContainer = document.getElementById("wishlist-container");
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function renderWishlist() {
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
      <h2 class="text-2xl font-bold mb-2">Your Wishlist</h2>
      <p class="text-gray-600 mb-6">Your wishlist is empty</p>
      <button class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
        <a href="index.html">Browse Products</a>
      </button>
    `;
        return;
    }

    let itemsHTML = wishlist.map((item, index) => `
    <div class="flex items-center justify-between bg-white shadow p-4 mb-4 rounded-lg">
      <div class="flex items-center space-x-4">
        <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-contain">
        <div class="text-left">
          <h3 class="font-semibold">${item.title}</h3>
          <p class="text-gray-600">$${item.price}</p>
        </div>
      </div>
      <button onclick="removeFromWishlist(${index})" 
        class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
        Remove
      </button>
    </div>
  `).join("");

    wishlistContainer.innerHTML = `
    <h2 class="text-2xl font-bold mb-6 text-center">Your Wishlist</h2>
    <div>${itemsHTML}</div>
  `;
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishlist();
}

renderWishlist();