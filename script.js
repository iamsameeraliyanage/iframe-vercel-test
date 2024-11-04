const netlifyIframe = document.getElementById('netlify-iframe');

document.getElementById('trigger-button').addEventListener('click', () => {
    try {
        // Send message to Netlify iframe with specified target origin
        netlifyIframe.contentWindow.postMessage(
            { action: 'request-data' }, 
            'https://iframe-netlify-test.netlify.app'
        );
    } catch (error) {
        console.error("Failed to send message to Netlify iframe:", error);
    }
});

// Listen for messages from Netlify iframe
window.addEventListener('message', (event) => {
    // Verify origin to ensure message is from a trusted source
    if (event.origin === 'https://iframe-netlify-test.netlify.app') {
        console.log('Data received from GitHub iframe:', event.data);
    } else {
        console.warn("Untrusted message origin:", event.origin);
    }
});
