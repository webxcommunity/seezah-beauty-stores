
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu').querySelector('ul');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Optional: Cart functionality
// Example: increase/decrease quantity, update total price dynamically


let cart = JSON.parse(localStorage.getItem('cart')) || [];
let productStock = JSON.parse(localStorage.getItem('stock')) || {};

// For each product, listen to quantity change
document.querySelectorAll('.product').forEach(product => {
    const quantityInput = product.querySelector('input[type="number"]');
    const priceEl = product.querySelector('.product-price');
    const basePrice = parseFloat(priceEl.getAttribute('data-base-price'));

    quantityInput.addEventListener('input', () => {
        let qty = parseInt(quantityInput.value);
        if (qty < 1) qty = 1;
        priceEl.textContent = (basePrice * qty).toLocaleString();
    });
});


function updateStockStatus(name, productElement) {
    const statusEl = productElement.querySelector('.stock-status');
    if (productStock[name] <= 0) {
        statusEl.textContent = 'Sold Out';
        statusEl.style.color = 'red';
        productElement.querySelector('.add-to-cart').disabled = true;
        productElement.querySelector('input[type="number"]').disabled = true;
    } else {
        statusEl.textContent = 'In Stock';
        statusEl.style.color = 'green';
        productElement.querySelector('.add-to-cart').disabled = false;
        productElement.querySelector('input[type="number"]').disabled = false;
    }
}


const addButtons = document.querySelectorAll('.add-to-cart');
addButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');
        const quantityId = button.getAttribute('data-quantity-id');
        const quantity = parseInt(document.getElementById(quantityId).value);

        if (quantity > productStock[name]) {
            alert(`Only ${productStock[name]} item(s) left in stock!`);
            return;
        }

        productStock[name] -= quantity;

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) existingItem.quantity += quantity;
        else cart.push({ name, price, image, quantity });

        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('stock', JSON.stringify(productStock));

        const productElement = button.closest('.product');
        updateStockStatus(name, productElement);

        alert(`${name} added to cart!`);
    });
});


function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <tr>
                <td><img src="${item.image}" width="50"> ${item.name}</td>
                <td>₦${item.price}</td>
                <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" class="update-quantity"></td>
                <td>₦${itemTotal}</td>
                <td><button class="remove-item" data-index="${index}">Remove</button></td>
            </tr>
        `;
    });

    cartTotalContainer.textContent = `Total: ₦${total}`;

    document.querySelectorAll('.update-quantity').forEach(input => {
        input.addEventListener('change', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            const newQty = parseInt(this.value);
            const stockLeft = productStock[cart[idx].name];
            const originalQty = cart[idx].quantity;
            if (newQty - originalQty > stockLeft) {
                alert(`Only ${stockLeft} more item(s) left in stock!`);
                this.value = originalQty;
                return;
            }
            productStock[cart[idx].name] -= (newQty - originalQty);
            cart[idx].quantity = newQty;
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('stock', JSON.stringify(productStock));
            displayCart();
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            productStock[cart[idx].name] += cart[idx].quantity;
            cart.splice(idx, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('stock', JSON.stringify(productStock));
            displayCart();
        });
    });
}

if (document.getElementById('cart-items')) displayCart();


if (document.getElementById('amount')) {
    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('amount').value = totalAmount;
}

const resetBtn = document.getElementById('reset-stock-cart');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to reset all stock and cart")) {
            localStorage.removeItem('stock');
            localStorage.removeItem('cart');
            location.reload();
        }
    });
}

function updateStockStatus (name, productElement) {
const statusEl = productElement.querySelector('.stock-status');
const badgeEl = productElement.querySelector('.stock-badge');
badgeEl.textContent = `Stock: ${productStock[name]}`;

const stockLeft = productStock[name];

if (stockLeft <= 0) {
    statusEl.textContent = 'sold Out';
    statusEl.style.color = 'red';
    badgeEl.textContent = 'Stock: 0';
    productElement.querySelector('.add-to-cart').disabled = true;
    productElement.querySelector('input[type="number"]').disabled = true;
} else {
        statusEl.textContent = 'In Stock';
        statusEl.style.color = 'green';
        badgeEl.textContent = `Stock: ${stockLeft}`;
        productElement.querySelector('.add-to-cart').disabled = false;
        productElement.querySelector('input[type="number"]').disabled = false;
    }
}