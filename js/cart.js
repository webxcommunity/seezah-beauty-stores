let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.querySelector('.cart-items');
cartContainer.innerHTML = '';

let total = 0;

cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" width="50"></td>
        <td>${item.name}</td>
        <td>₦${item.price.toLocaleString()}</td>
        <td><input type="number" value="${item.quantity}" min="1" data-index="${index}" class="cart-qty"></td>
        <td>₦${(item.price * item.quantity).toLocaleString()}</td>
        <td><button class="remove-item" data-index="${index}">Remove</button></td>
    `;
    cartContainer.appendChild(row);
});

document.querySelector('.cart-total').textContent = `₦${total.toLocaleString()}`;

// Quantity change
document.querySelectorAll('.cart-qty').forEach(input => {
    input.addEventListener('input', (e) => {
        const index = e.target.dataset.index;
        let qty = parseInt(e.target.value);
        if (qty < 1) qty = 1;
        cart[index].quantity = qty;
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
    });
});

// Remove item
document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
    });
});
