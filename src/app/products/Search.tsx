'use client'

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Search({products}:any) {
    const [allProducts, setAllProducts] = useState(products);
    const [filteredProducts, setFilteredProducts] = useState(allProducts);

    const [lastIndex, setLastIndex] = useState(allProducts.length - 1);
    const inputRef = useRef<any>(null);
    const { ref, inView, entry } = useInView({
      threshold: 1,
      triggerOnce: true
    });

   async function handleInputChange(e:any){
        const searchInput = e.target.value;
        const productsLength = allProducts?.data?.length;
        const data = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/search`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             productsLength,
              searchInput
            })
          });
          const newProducts = await data.json();
          setFilteredProducts({data: newProducts?.data});
    }

    function productsFunction(){
      if(inputRef?.current?.value === ""){
        return allProducts;
    }else{
      return filteredProducts
    }
  }
  useEffect(()=>{
    if(inView === true && inputRef?.current?.value === ""){
      const fetchNewProducts = async () => {
      const data = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offset: allProducts?.data?.length,
          limit: 5
        })
      });
      const newProducts = await data.json();
      setAllProducts({data: [...allProducts?.data, ...newProducts?.data]});
    }
    fetchNewProducts();
  }
  },[inView])

  useEffect(()=> {
    if(allProducts?.data?.length > 0){
      setLastIndex(allProducts?.data?.length - 1);
    }
  },[allProducts])
    return (
        <>
   <div id="root" className="bg-neutral-50">
  <section id="search" className=" py-6">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className=" relative animate__animated animate__fadeInDown">
        <input
        ref={inputRef} 
        type="text"
        id="searchInput"
        placeholder="Search products..." 
        onChange={handleInputChange}
        className="w-full px-6 py-4 rounded-lg bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary text-lg shadow-lg"
      />
        
        </div>

  
        
      </div>
    </div>
  </section>
  <div id="root" className=''>
  <section id="featured-products" className=" mx-auto flex justify-center">
    <div className="container px-4">
      <h1 className="text-3xl font-medium text-center mb-12 animate__animated animate__fadeIn">Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {
           productsFunction()?.data?.map((product:any, index:any) => {
                return (
        <Link href={`/products/${product?.id}`} key={index} ref={ lastIndex === index ? ref : null}>
        <div className=" bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp">
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