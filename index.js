let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function addToStorage(type, product) {
    let arr = JSON.parse(localStorage.getItem(type)) || [];
    if (!arr.some(item => item.id === product.id)) {
        arr.push(product);
        localStorage.setItem(type, JSON.stringify(arr));
        alert(product.name + " added to " + type);
    } else {
        alert(product.name + " is already in " + type);
    }
}

document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", function() {
        let parent = this.closest("div");
        let product = {
            id: parent.getAttribute("data-id"),
            name: parent.getAttribute("data-name"),
            price: parent.getAttribute("data-price"),
            image: parent.getAttribute("data-image")
        };
        addToStorage("cart", product);
    });
});

document.querySelectorAll(".add-wishlist").forEach(btn => {
    btn.addEventListener("click", function() {
        let parent = this.closest("div");
        let product = {
            id: parent.getAttribute("data-id"),
            name: parent.getAttribute("data-name"),
            price: parent.getAttribute("data-price"),
            image: parent.getAttribute("data-image")
        };
        addToStorage("wishlist", product);
    });
});