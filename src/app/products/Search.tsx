'use client'

import Link from "next/link";
import { useState } from "react";

export default function Search({products}:any) {
    const [allProducts, setAllProducts] = useState(products);
  
    function handleInputChange(e:any){
        const searchInput = e.target.value;
        const filteredProducts = products?.data?.filter((product:any) => {
            return product.name.toLowerCase().includes(searchInput.toLowerCase());
        });
        setAllProducts({data: filteredProducts});
    }
    return (
        <>
            <div id="root">
  <section id="search" className="bg-white py-12">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative animate__animated animate__fadeInDown">
        <input 
        type="text"
        id="searchInput"
        placeholder="Search products..." 
        onChange={handleInputChange}
        className="w-full px-6 py-4 rounded-lg bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary text-lg shadow-lg"
      />
        
        </div>

        <div className="mt-6 flex flex-wrap gap-3 justify-center animate__animated animate__fadeInUp">
          <button className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-black hover:text-white transition-colors">
            All Products
          </button>
          <button className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-black hover:text-white transition-colors">
            New Arrivals
          </button>
          <button className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-black hover:text-white transition-colors">
            Popular
          </button>
          <button className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-black hover:text-white transition-colors">
            Featured
          </button>
        </div>

        
      </div>
    </div>
  </section>
  <div id="root" className=''>
  <section id="featured-products" className="bg-neutral-50 pt-12 mx-auto flex justify-center">
    <div className="container px-4">
      <h1 className="text-3xl font-bold text-center mb-12 animate__animated animate__fadeIn">Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
            allProducts?.data?.map((product:any, index:any) => {
                return (
        <Link href={`/products/${product?.id}`} key={index}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp">
          <div className="aspect-w-16 aspect-h-9 bg-neutral-200">
            <div className="flex items-center justify-center h-48 bg-white overflow-hidden">
             <img src={product.image} alt={product?.name} className='object-contain w-full h-full'/>
            </div>
          </div>
          <div className="p-5 bg-neutral-200">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-neutral-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
          </div>
        </div>
        </Link>
                )
            })
        }

     
     
      </div>
    </div>
  </section>

</div>  
</div>
        </>
       
    )
}