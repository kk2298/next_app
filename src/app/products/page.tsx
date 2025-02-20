import Link from 'next/link';
import React from 'react';
import { Metadata } from 'next';
import Search from './Search';
import Head from 'next/head';

export const metadata: Metadata = {
    title: "Product List",
    description: "List of products available"
    };



type Props = {};


const Page = async (props: Props) => {

  const data = await fetch('http://localhost:3000/api/search', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const allProducts = await data.json();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "itemListElement": allProducts?.data?.map((product:any, index:any) => {
      return {
        "@type": "ListItem",
        "position": index + 1,
        "url": `http://localhost:3001/products/${product.id}`,
        "name": product.name,
        "description": product.description,
        "image": product.image,
      };
    }),

  }
  
  
  if (!allProducts) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
    <Head>
        <title>Product List</title>
        <meta property="og:title" content="Product List" />
        <meta property="og:description" content="List of products available" />
    </Head>
      <Search products={allProducts}/>
    </>
  );
};

export default Page;