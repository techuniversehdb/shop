// Function to load products from JSON and display them
function loadProducts() {
    fetch('products.json') // Fetch the data from the local JSON file
        .then(response => {
            if (!response.ok) {
                // Handle case where JSON file might be missing or unreachable
                throw new Error('Could not load products.json: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const productGrid = document.querySelector('.product-grid');
            productGrid.innerHTML = ''; // Clear existing content

            if (!data.products || data.products.length === 0) {
                 productGrid.innerHTML = '<p>No featured products available right now. Please check back soon!</p>';
                 return;
            }

            data.products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');

                // Determine the price display based on the JSON data
                const priceDisplay = product.price.toLowerCase().includes('quote') ? 
                                     `Price: ${product.price}` : 
                                     `Price: ₹${product.price}*`;

                // Create the HTML structure for one product card
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <span class="price">${priceDisplay}</span>
                    <a href="tel:+917074550550" class="cta-button-small">Call to Check Stock</a>
                `;
                
                productGrid.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('There was a problem loading the products:', error);
            // Display a graceful error message if loading fails
            document.querySelector('.product-grid').innerHTML = '<p>We are currently updating our online catalog. Please call the shop for the latest products!</p>';
        });
}

// Ensure the function runs once the page is fully loaded
document.addEventListener('DOMContentLoaded', loadProducts);
