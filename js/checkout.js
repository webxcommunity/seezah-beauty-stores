
const cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

// Set hidden input for Paystack
document.getElementById('amount').value = totalAmount * 100; // kobo

const paystackBtn = document.getElementById('paystack-button');
paystackBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const handler = PaystackPop.setup({
        key: 'pk_test_661f4c519ceebbfd2ed5b5c1ea759af6f16883b2', // replace with your public key
        email: document.getElementById('email').value,
        amount: totalAmount * 100,
        currency: "NGN",
        onClose: function() {
            alert('Payment window closed.');
        },
        callback: function(response) {
            alert('Payment successful! Reference: ' + response.reference);
            // Clear cart and stock
            localStorage.removeItem('cart');
        }
    });
    handler.openIframe();
});
