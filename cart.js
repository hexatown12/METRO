const cartContainer = document.getElementById("cart-container");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    if (cart.length === 0) {
        cartContainer.innerHTML = `
      <h2 class="text-2xl font-bold mb-2">Your Cart</h2>
      <p class="text-gray-600 mb-6">Your cart is empty</p>
      <button class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
        <a href="index.html">Browse Products</a>
      </button>
    `;
        return;
    }

    let itemsHTML = cart.map((item, index) => `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white shadow p-4 mb-4 rounded-lg">
      <div class="flex items-center space-x-4 mb-3 sm:mb-0">
        <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-contain">
        <div class="text-left">
          <h3 class="font-semibold text-sm sm:text-base">${item.title}</h3>
          <p class="text-gray-600 text-sm sm:text-base">$${item.price}</p>
          <div class="flex items-center space-x-2 mt-1">
            <button onclick="decreaseQty(${index})" class="bg-gray-300 px-2 rounded text-sm">-</button>
            <span class="text-sm sm:text-base">${item.quantity || 1}</span>
            <button onclick="increaseQty(${index})" class="bg-gray-300 px-2 rounded text-sm">+</button>
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <p class="font-bold text-lg mb-2 sm:mb-0 text-center sm:text-left">$${(item.price * (item.quantity || 1)).toFixed(2)}</p>
        <button onclick="removeItem(${index})" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 w-full sm:w-auto">Remove</button>
      </div>
    </div>
  `).join("");

    cartContainer.innerHTML = `
    <h2 class="text-2xl font-bold mb-6 text-center">Your Cart</h2>
    <div>${itemsHTML}</div>
    <div class="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
      <p class="font-semibold text-lg">Total: $${cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0).toFixed(2)}</p>
      <button onclick="checkout()" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full sm:w-auto">Checkout</button>
    </div>
  `;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function increaseQty(index) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function decreaseQty(index) {
    if ((cart[index].quantity || 1) > 1) {
        cart[index].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

function checkout() {
    let billHTML = `
      <h2 class="text-2xl font-bold mb-4 text-center">Your Bill</h2>
      <div class="bg-white shadow p-4 rounded-lg mb-4">
        ${cart.map(item => `
          <div class="flex flex-col sm:flex-row justify-between border-b py-2">
            <span class="text-sm sm:text-base">${item.title} (x${item.quantity || 1})</span>
            <span class="text-sm sm:text-base">$${(item.price * (item.quantity || 1)).toFixed(2)}</span>
          </div>
        `).join("")}
        <div class="flex flex-col sm:flex-row justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>$${cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0).toFixed(2)}</span>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        <button onclick="renderCart()" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto">Back to Cart</button>
        <button onclick="window.print()" class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 w-full sm:w-auto">Print Bill</button>
      </div>
    `;

    cartContainer.innerHTML = billHTML;
}

renderCart();