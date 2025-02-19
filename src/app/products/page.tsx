import Link from 'next/link';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Product List"
    };

type Props = {};

const Page = async (props: Props) => {

  const data = await fetch('http://localhost:3000/api/dummy', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const allProducts = await data.json();
  console.log(allProducts);
  
  if (!allProducts) {
    return <div>Loading...</div>;
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
            className="w-full px-6 py-4 rounded-lg bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary text-lg shadow-lg"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-all hover:scale-105">
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </span>
          </button>
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

        <div id="searchSuggestions" className="hidden absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-neutral-200">
          <div className="p-4">
            <div className="animate__animated animate__fadeIn">
              <p className="text-sm text-neutral-500 mb-2">Popular Searches</p>
              <div className="space-y-2">
                <div className="p-2 hover:bg-neutral-50 rounded cursor-pointer transition-colors">
                  Popular Item 1
                </div>
                <div className="p-2 hover:bg-neutral-50 rounded cursor-pointer transition-colors">
                  Popular Item 2
                </div>
                <div className="p-2 hover:bg-neutral-50 rounded cursor-pointer transition-colors">
                  Popular Item 3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div id="root" className=''>
  <section id="featured-products" className="bg-neutral-50 pt-12 mx-auto flex justify-center">
    <div className="container px-4">
      <h2 className="text-3xl font-bold text-center mb-12 animate__animated animate__fadeIn">Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
            allProducts?.data?.map((product:any, index:any) => {
                return (
        <Link href={`/products/1`} key={index}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp">
          <div className="aspect-w-16 aspect-h-9 bg-neutral-200">
            <div className="flex items-center justify-center h-48 bg-neutral-300">
              <span className="text-neutral-600">Product Image</span>
            </div>
          </div>
          <div className="p-6">
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
  );
};

export default Page;