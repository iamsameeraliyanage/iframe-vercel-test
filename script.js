const netlifyIframe = document.getElementById('netlify-iframe');
const communicationLog = document.getElementById('communication-log');

document.getElementById('trigger-button').addEventListener('click', () => {
    // Generate a random order ID for the payment
    const orderId = `ORD-${Math.random().toString(36).substring(2, 10)}`;
    const paymentData = {
        amount: 100,
        currency: 'USD',
        orderId: orderId
    };

    // Log the payment initiation
    communicationLog.innerHTML += `<br>Payment initiated: ${JSON.stringify(paymentData)}`;

    // Send message to Netlify iframe with payment data
    try {
        netlifyIframe.contentWindow.postMessage(
            { action: 'initiate-payment', data: paymentData }, 
            'https://iframe-netlify-test.netlify.app'
        );
    } catch (error) {
        console.error("Failed to send message to Netlify iframe:", error);
    }
});

// Listen for messages from Netlify iframe
window.addEventListener('message', (event) => {
    if (event.origin === 'https://iframe-netlify-test.netlify.app') {
        communicationLog.innerHTML += `<br>Payment status received: ${JSON.stringify(event.data)}`;
    } else {
        console.warn("Untrusted message origin:", event.origin);
    }
});
