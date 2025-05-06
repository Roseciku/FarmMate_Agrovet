
export async function fetchProducts() {
    const response = await fetch('http://localhost:5500/api/allproducts');
    const data = await response.json();
    return data.products || data; // Return correct shape
  }
  


