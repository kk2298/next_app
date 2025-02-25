import Link from 'next/link';
import React from 'react';
import { Metadata } from 'next';
import Search from './Search';
import Head from 'next/head';

export const metadata: Metadata = {
    title: "Product List",
    description: "List of products available"
    };


const port = 3000
type Props = {};


const Page = async (props: Props) => {

  const data = await fetch(`http://localhost:${process.env.PORT}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      offset: 0,
      limit: 5
    })
  });
  const allProducts = await data.json();
  
  
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