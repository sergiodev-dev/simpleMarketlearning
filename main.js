const cart = [];
const maxCartSize = 14;
let coinBalance = 50;  // Starting balance of coins

const purchaseButton = document.getElementById('purchaseButton');
const totalAmountElement = document.getElementById('totalAmount');
const coinBalanceElement = document.getElementById('coinBalance');

function talk() {
    document.querySelector('.bought').innerText = "Hi! My name is Lisa. What would you like to buy?";
}

function addToCart(item, price) {
    if (cart.length < maxCartSize && coinBalance >= price) {
        cart.push({ item, price });
        coinBalance -= price;  // Deduct the price from the wallet
        updateCartDisplay();
        updateWallet();

        if (cart.length === maxCartSize) {
            purchaseButton.disabled = true;
            document.querySelector('.display').innerText = "Cart is full!";
        }
    } else if (coinBalance < price) {
        alert("You don't have enough coins!");
    }
}

function updateCartDisplay() {
    const cartContainer = document.querySelector('.bought');
    cartContainer.innerHTML = '';  // Clear previous items

    cart.forEach(cartItem => {
        const itemElement = document.createElement('div');
        itemElement.innerText = `${cartItem.item} - $${cartItem.price}`;
        cartContainer.appendChild(itemElement);
    });
}

function updateWallet() {
    coinBalanceElement.innerText = coinBalance;
    const total = cart.reduce((sum, cartItem) => sum + cartItem.price, 0);
    totalAmountElement.innerText = total;
}

function purchase() {
    if (cart.length === 0) {
        document.querySelector('.display').innerText = 'Your cart is empty!';
    } else {
        speak();  // Display purchase message
        const cartContainer = document.querySelector('.bought');
        cartContainer.innerHTML = '';
        cart.length = 0;  // Clear the cart
        updateWallet();
        purchaseButton.disabled = false;
        document.querySelector('.display').innerText = '';  // Clear message after purchase
    }
}

function speak() {
    const message = cart.length > 0 
        ? `You have purchased: ${cart.map(item => item.item).join(', ')} for $${cart.reduce((sum, item) => sum + item.price, 0)}`
        : 'Your cart is empty';
    document.querySelector('.display').innerText = message;
}