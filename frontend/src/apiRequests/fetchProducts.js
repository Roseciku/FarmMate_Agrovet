
const PRODUCTS_URL = 'http://localhost:5500/api/allproducts';

export async function fetchProducts() {

    const response = await fetch(PRODUCTS_URL);
    return response.json(); 
}


