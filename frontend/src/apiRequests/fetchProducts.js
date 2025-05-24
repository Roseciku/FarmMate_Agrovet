
export async function fetchProducts() {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/allproducts`);
    const data = await response.json();
    return data.products || data; // Return correct shape
  }
  


