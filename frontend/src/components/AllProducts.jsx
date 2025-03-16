import { useEffect, useState } from 'react';
import { fetchProducts } from "../apiRequests/fetchProducts";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 font-poppins'>
        {products.map((product) => (
          <li key={product.product_id} className='border p-4 m-2 flex-1 min-w-[250px] max-w-[300px]'>
            <img src={`http://localhost:5500${product.image}`} alt={product.name} className='w-[200px] h-[200px]' />
            <h2>{product.name}</h2>
            <p className='font-bold'>Ksh {product.price}</p>
            <p className={`w-full transition-all duration-300 ease-in-out ${expandedDescriptions[product.product_id] ? "whitespace-normal" : "truncate"}`}>
              {expandedDescriptions[product.product_id]
                ? product.description
                : product.description.substring(0, 30) + '...'}
            </p>
            <button onClick={() => toggleDescription(product.product_id)} className='text-brightYellow block'>
              {expandedDescriptions[product.product_id] ? 'Less' : 'More'}
            </button>
            <button className=" flex mx-auto mt-5 justify-center items-center text-center font-poppins cursor-pointer px-5 bg-brightYellow w-[200px] h-[30px] text-white text-md rounded-full">
                Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllProducts;
