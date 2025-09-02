

// ===== Admin Panel Password =====
const adminPassword = "seezah123"; // set your password
const password = prompt("Enter admin password to access product panel:");
if (password === adminPassword) {
    document.getElementById('admin-panel').style.display = 'block';
}

// ===== Render Products =====
const productsContainer = document.querySelector('.products-container');
let productStock = JSON.parse(localStorage.getItem('stock')) || {};

// Initialize stock for each product
productsList.forEach(prod => {
    if (!(prod.name in productStock)) productStock[prod.name] = prod.stock;
});

// Function to update stock badge and status
function updateStockStatus(name, productElement) {
    const statusEl = productElement.querySelector('.stock-status');
    const badgeEl = productElement.querySelector('.stock-badge');
    const stockLeft = productStock[name];

    if (stockLeft <= 0) {
        statusEl.textContent = 'Sold Out';
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

// Render each product dynamically
function renderProducts() {
    productsContainer.innerHTML = "";
    productsList.forEach((prod, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.setAttribute('data-stock', productStock[prod.name]);

        productDiv.innerHTML = `
          <img src="${prod.image}" alt="${prod.name}">
          <h3>${prod.name}</h3>
          <p>₦<span class="product-price" data-base-price="${prod.price}">${prod.price.toLocaleString()}</span></p>
          <label for="quantity${index}">Quantity:</label>
          <input type="number" id="quantity${index}" value="1" min="1">
          <button class="add-to-cart" data-name="${prod.name}" data-price="${prod.price}" data-image="${prod.image}" data-quantity-id="quantity${index}">Add to Cart</button>
          <span class="stock-status">In Stock</span>
          <span class="stock-badge">Stock: ${productStock[prod.name]}</span>
        `;
        productsContainer.appendChild(productDiv);

        updateStockStatus(prod.name, productDiv);

        // Dynamic price update
        const quantityInput = productDiv.querySelector('input[type="number"]');
        const priceEl = productDiv.querySelector('.product-price');
        const basePrice = parseFloat(priceEl.getAttribute('data-base-price'));
        quantityInput.addEventListener('input', () => {
            let qty = parseInt(quantityInput.value);
            if (qty < 1) qty = 1;
            priceEl.textContent = (basePrice * qty).toLocaleString();
        });

        // Add to Cart
        const addBtn = productDiv.querySelector('.add-to-cart');
        addBtn.addEventListener('click', () => {
            const qty = parseInt(quantityInput.value);
            if (qty > productStock[prod.name]) {
                alert(`Only ${productStock[prod.name]} left in stock!`);
                return;
            }

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ name: prod.name, price: prod.price, image: prod.image, quantity: qty });
            localStorage.setItem('cart', JSON.stringify(cart));

            productStock[prod.name] -= qty;
            localStorage.setItem('stock', JSON.stringify(productStock));

            updateStockStatus(prod.name, productDiv);
            alert(`${prod.name} added to cart!`);
        });
    });
}

renderProducts();

// ===== Admin Add Product Form =====
const addForm = document.getElementById('add-product-form');
if (addForm) {
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('admin-name').value;
        const price = parseFloat(document.getElementById('admin-price').value);
        const stock = parseInt(document.getElementById('admin-stock').value);
        const image = document.getElementById('admin-image').value;

        const newProduct = { name, price, stock, image };
        productsList.push(newProduct);
        productStock[name] = stock;
        localStorage.setItem('stock', JSON.stringify(productStock));

        renderProducts();
        addForm.reset();
        alert(`${name} added successfully!`);
    });
}











// // Optional: Cart functionality
// // Example: increase/decrease quantity, update total price dynamically





// let cart = JSON.parse(localStorage.getItem('cart')) || [];
// let productStock = JSON.parse(localStorage.getItem('stock')) || {};

// For each product, listen to quantity change
// document.querySelectorAll('.product').forEach(product => {
//     const quantityInput = product.querySelector('input[type="number"]');
//     const priceEl = product.querySelector('.product-price');
//     const basePrice = parseFloat(priceEl.getAttribute('data-base-price'));

//     quantityInput.addEventListener('input', () => {
//         let qty = parseInt(quantityInput.value);
//         if (qty < 1) qty = 1;
//         priceEl.textContent = (basePrice * qty).toLocaleString();
//     });
// });


// function updateStockStatus(name, productElement) {
//     const statusEl = productElement.querySelector('.stock-status');
//     if (productStock[name] <= 0) {
//         statusEl.textContent = 'Sold Out';
//         statusEl.style.color = 'red';
//         productElement.querySelector('.add-to-cart').disabled = true;
//         productElement.querySelector('input[type="number"]').disabled = true;
//     } else {
//         statusEl.textContent = 'In Stock';
//         statusEl.style.color = 'green';
//         productElement.querySelector('.add-to-cart').disabled = false;
//         productElement.querySelector('input[type="number"]').disabled = false;
//     }
// }


// const addButtons = document.querySelectorAll('.add-to-cart');
// addButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const name = button.getAttribute('data-name');
//         const price = parseFloat(button.getAttribute('data-price'));
//         const image = button.getAttribute('data-image');
//         const quantityId = button.getAttribute('data-quantity-id');
//         const quantity = parseInt(document.getElementById(quantityId).value);

//         if (quantity > productStock[name]) {
//             alert(`Only ${productStock[name]} item(s) left in stock!`);
//             return;
//         }

//         productStock[name] -= quantity;

//         const existingItem = cart.find(item => item.name === name);
//         if (existingItem) existingItem.quantity += quantity;
//         else cart.push({ name, price, image, quantity });

//         localStorage.setItem('cart', JSON.stringify(cart));
//         localStorage.setItem('stock', JSON.stringify(productStock));

//         const productElement = button.closest('.product');
//         updateStockStatus(name, productElement);

//         alert(`${name} added to cart!`);
//     });
// });


// function displayCart() {
//     const cartItemsContainer = document.getElementById('cart-items');
//     const cartTotalContainer = document.getElementById('cart-total');
//     if (!cartItemsContainer) return;

//     cartItemsContainer.innerHTML = '';
//     let total = 0;

//     cart.forEach((item, index) => {
//         const itemTotal = item.price * item.quantity;
//         total += itemTotal;

//         cartItemsContainer.innerHTML += `
//             <tr>
//                 <td><img src="${item.image}" width="50"> ${item.name}</td>
//                 <td>₦${item.price}</td>
//                 <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" class="update-quantity"></td>
//                 <td>₦${itemTotal}</td>
//                 <td><button class="remove-item" data-index="${index}">Remove</button></td>
//             </tr>
//         `;
//     });

//     cartTotalContainer.textContent = `Total: ₦${total}`;

//     document.querySelectorAll('.update-quantity').forEach(input => {
//         input.addEventListener('change', function() {
//             const idx = parseInt(this.getAttribute('data-index'));
//             const newQty = parseInt(this.value);
//             const stockLeft = productStock[cart[idx].name];
//             const originalQty = cart[idx].quantity;
//             if (newQty - originalQty > stockLeft) {
//                 alert(`Only ${stockLeft} more item(s) left in stock!`);
//                 this.value = originalQty;
//                 return;
//             }
//             productStock[cart[idx].name] -= (newQty - originalQty);
//             cart[idx].quantity = newQty;
//             localStorage.setItem('cart', JSON.stringify(cart));
//             localStorage.setItem('stock', JSON.stringify(productStock));
//             displayCart();
//         });
//     });

//     document.querySelectorAll('.remove-item').forEach(button => {
//         button.addEventListener('click', function() {
//             const idx = parseInt(this.getAttribute('data-index'));
//             productStock[cart[idx].name] += cart[idx].quantity;
//             cart.splice(idx, 1);
//             localStorage.setItem('cart', JSON.stringify(cart));
//             localStorage.setItem('stock', JSON.stringify(productStock));
//             displayCart();
//         });
//     });
// }

// if (document.getElementById('cart-items')) displayCart();


// if (document.getElementById('amount')) {
//     let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     document.getElementById('amount').value = totalAmount;
// }

// const resetBtn = document.getElementById('reset-stock-cart');
// if (resetBtn) {
//     resetBtn.addEventListener('click', () => {
//         if (confirm("Are you sure you want to reset all stock and cart")) {
//             localStorage.removeItem('stock');
//             localStorage.removeItem('cart');
//             location.reload();
//         }
//     });
// }

// function updateStockStatus (name, productElement) {
// const statusEl = productElement.querySelector('.stock-status');
// const badgeEl = productElement.querySelector('.stock-badge');
// badgeEl.textContent = `Stock: ${productStock[name]}`;

// const stockLeft = productStock[name];

// if (stockLeft <= 0) {
//     statusEl.textContent = 'sold Out';
//     statusEl.style.color = 'red';
//     badgeEl.textContent = 'Stock: 0';
//     productElement.querySelector('.add-to-cart').disabled = true;
//     productElement.querySelector('input[type="number"]').disabled = true;
// } else {
//         statusEl.textContent = 'In Stock';
//         statusEl.style.color = 'green';
//         badgeEl.textContent = `Stock: ${stockLeft}`;
//         productElement.querySelector('.add-to-cart').disabled = false;
//         productElement.querySelector('input[type="number"]').disabled = false;
//     }
// }