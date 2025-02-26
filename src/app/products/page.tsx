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
  let allProducts = [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        offset: 0,
        limit: 10
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    allProducts = await response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return <div>Error loading products. Please try again later.</div>;
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
      <Search products={allProducts} />
    </>
  );
};

export default Page;