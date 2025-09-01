

document.addEventListener('DOMContentLoaded', function() {
  const paymentForm = document.getElementById('checkout-form');

  paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let amount = document.getElementById('amount').value;

    // Paystack inline payment
    let handler = PaystackPop.setup({
      key: 'pk_test_661f4c519ceebbfd2ed5b5c1ea759af6f16883b2', // Replace with your test public key
      email: email,
      amount: amount * 100, // Convert to kobo
      currency: "NGN",
      ref: 'SEEZAH_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: fullname
          },
          {
            display_name: "Phone Number",
            variable_name: "phone_number",
            value: phone
          }
        ]
      },
      callback: function(response){
        window.location.href = "success.html?reference=" + response.reference;
      },
      onClose: function(){
        alert('Payment was not completed. Please try again.');
      }
    });

    handler.openIframe();
  });
});



// document.addEventListener('DOMContentLoaded', function() {
//     const paymentForm = document.getElementById('checkout-form');

//     paymentForm.addEventListener('submit', function(e){
//         e.preventDefault();

//         let fullname = document.getElementById('fullname').value;
//         let email = document.getElementById('email').value;
//         let phone = document.getElementById('phone').value;
//         let amount = document.getElementById('amount').value;

//         let handler = PaystackPop.setup({
//             key: 'pk_test_661f4c519ceebbfd2ed5b5c1ea759af6f16883b2',
//             email: email,
//             amount: amount * 100,
//             currency: "NGN",
//             ref: 'SEEZAH_' + Math.floor((Math.random() * 1000000000) + 1),
//             callback: function(response){
//                 window.location.href = "success.html?reference=" + response.reference;
//             },
//             onClose: function(){
//                 alert('Payment was not completed. Please try again.');
//             }
//         });

//         handler.openIframe();
//     });
// });

// const paymentForm = document.getElementById('checkout-form');

// paymentForm.addEventListener('submit', function(e){
//     e.preventDefault();

//     let fullname = document.getElementById('fullname').value;
//     let email = document.getElementById('email').value;
//     let phone = document.getElementById('phone').value;
//     let amount = document.getElementById('amount').value;

//     let handler = PaystackPop.setup({
//         key: 'pk_test_661f4c519ceebbfd2ed5b5c1ea759af6f16883b2', 
//         email: email,
//         amount: amount * 100, 
//         currency: "NGN",
//         ref: 'SEEZAH_' + Math.floor((Math.random() * 1000000000) + 1),
//         metadata: {
//             custom_fields: [
//                 {
//                     display_name: "Full Name",
//                     variable_name: "full_name",
//                     value: fullname
//                 },
//                 {
//                     display_name: "Phone Number",
//                     variable_name: "phone_number",
//                     value: phone
//                 }
//             ]
//         },
//         callback: function(response){
           
//             window.location.href = "success.html?reference=" + response.reference;
//         },
//         onClose: function(){
//             alert('Payment was not completed. Please try again.');
//         }
//     });

//     handler.openIframe();
// });
