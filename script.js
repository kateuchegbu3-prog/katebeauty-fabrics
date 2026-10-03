let cart = [];
let total = 0;
function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('cartOverlay').style.display = 'block';
}
function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('cartOverlay').style.display = 'none';
}
function addToCart(name, price) {
    cart.push({name, price});
    total += price;
    updateCart();
    openCart();
}
function updateCart() {
    document.getElementById('cartTotal').innerText = 'Total: $' + total;
    //you can also list items here
}
// Connect your cart icon
document.addEventListener('DOMContentLoaded', function() {
let cartIcon = document.querySelector('.fa-shopping-cart');
if(cartIcon) {
    cartIcon.parentElement.onclick = openCart;
}
});
 