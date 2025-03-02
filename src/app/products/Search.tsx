'use client'

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import productImages from '../constants';
import Breadcrumbs from  '../components/breadcrumbs';
import { useDebounce } from 'use-debounce';
import Card from "../components/card";

export default function Search({ products }: any) {
  const [allProducts, setAllProducts] = useState(products);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const inputRef = useRef<any>(null);

  // const [lastIndex, setLastIndex] = useState(allProducts.length - 1);
  // const { ref, inView, entry } = useInView({
  //   threshold: 1,
  //   triggerOnce: true
  // });

  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearchInput] = useDebounce(searchInput, 500);

  useEffect(() => {
    async function fetchFilteredProducts() {
      const productsLength = allProducts?.data?.length;
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productsLength,
          searchInput: debouncedSearchInput
        })
      });
      const newProducts = await data.json();
      setFilteredProducts({ data: newProducts?.data });
    }

    if (debouncedSearchInput) {
      fetchFilteredProducts();
    } else {
      setFilteredProducts(allProducts);
    }
  }, [debouncedSearchInput, allProducts]);

  function handleInputChange(e: any) {
    setSearchInput(e.target.value);
  }

  function productsFunction() {
    if (inputRef?.current?.value === "") {
      return allProducts;
    } else {
      return filteredProducts;
    }
  }

  // useEffect(() => {
  //   if (inView === true && inputRef?.current?.value === "") {
  //     const fetchNewProducts = async () => {
  //       const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           offset: allProducts?.data?.length,
  //           limit: 10
  //         })
  //       });
  //       const newProducts = await data.json();
  //       setAllProducts({ data: [...allProducts?.data, ...newProducts?.data] });
  //     }
  //     fetchNewProducts();
  //   }
  // }, [inView,allProducts?.data])

  // useEffect(() => {
  //   if (allProducts?.data?.length > 0) {
  //     setLastIndex(allProducts?.data?.length - 1);
  //   }
  // }, [allProducts])

  return (
    <>
      <Breadcrumbs items={[
        { label: 'Products', href: '/products' }
      ]} />
      <div id="root" className="bg-neutral-50 min-h-screen">
        <section id="search" className="py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative animate__animated animate__fadeInDown">
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
        <div id="root" className='mt-6'>
          <section id="featured-products" className="mx-auto flex justify-center">
            <div className="container px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {
                  productsFunction()?.data?.map((product: any) => {
                    return (
                      <Card product={product} key={product._id}/>
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