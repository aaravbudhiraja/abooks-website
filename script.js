let cart = [];

function addToCart(item) {
    cart.push(item);
    updateCartCount();

    // Smooth confirmation popup
    showToast("✅ Added to Cart!");
}

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

function viewCart() {
    if (cart.length === 0) {
        showToast("🛒 Your cart is empty!");
        return;
    }

    let items = cart.join("\n");
    alert("Your Cart:\n\n" + items);
}

function showToast(message) {
    let toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.background = "#2575fc";
    toast.style.color = "white";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "25px";
    toast.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
    toast.style.zIndex = "999";
    toast.style.opacity = "0";
    toast.style.transition = "0.4s";

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "1";
    }, 100);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 400);
    }, 2000);
}