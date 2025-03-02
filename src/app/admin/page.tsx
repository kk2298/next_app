'use client'
import React, { useEffect, useState } from 'react'
import DialogBox from '../components/dialog'
import AlertBox from '../components/alert'
import {toast} from 'react-toastify';
type Props = {}

const page = (props: Props) => {

  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [keywords, setKeywords] = useState<Array<String>>([]);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<any>([]);

  async function addNewProduct(e: any){
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set('keywords', JSON.stringify(keywords));
    try {   
      const response = await fetch('/api/products/create-product', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if(result.error === false){
        toast.success('Product added successfully');
        setOpenAddForm(false);
        setKeywords([]);
      }else{
        toast.error('Failed to add product');
      }

    } catch (error) {
      toast.error('Failed to add product');
    }

    setLoading(false);
    fetchAllProducts();
  }

  async function updateProduct(e: any){
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set('keywords', JSON.stringify(keywords));
    formData.append('_id', currentProduct._id);
    try {   
      const response = await fetch('/api/products/update-product', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      
      if(result.error === false){
        toast.success('Changes Saved');
        setOpenEditForm(false);
        setKeywords([]);
      }else{
        toast.error('Failed to save changes');
      }

    } catch (error) {
      toast.error('Failed to save changes');
    }
    setLoading(false);
    fetchAllProducts();
  }

  async function deleteProduct(e: any){
    e.preventDefault();
    try {   
      const response = await fetch(`/api/products/delete-product`, {
        method: 'DELETE',
        body: JSON.stringify({_id: currentProduct._id}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if(result.error === false){
        toast.success('Product deleted successfully');
      }else{
        toast.error('Failed to delete product');
      }
      setShowAlert(false);

    } catch (error) {
      toast.error('Failed to delete product');
    }
  }

  async function fetchAllProducts(){
    const response = await fetch('/api/products/get-products');
    const result = await response.json();
    setAllProducts(result);
  }
  useEffect(() => {
    fetchAllProducts();
  },[])

  return (
    <>
    <DialogBox open={openAddForm} setOpen={setOpenAddForm} onSubmit={addNewProduct} keywords={keywords} setKeywords={setKeywords} loading={loading}/>
    <DialogBox open={openEditForm} setOpen={setOpenEditForm} onSubmit={updateProduct}  product={currentProduct} keywords={keywords} setKeywords={setKeywords} loading={loading}/>
    <AlertBox open={showAlert} setOpen={setShowAlert} title='Delete Product?' description="This operation will delete the product" buttonTitle={"Delete"} onSubmit={deleteProduct}/>
    <div  className="bg-neutral-50 pt-20">
  {/* All products list */}
      <div className="p-6">
     <div className="w-full  bg-white p-6 rounded-lg shadow-md animate__animated animate__fadeIn">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">All Products</h2>
    <button id="add-product-btn" className="bg-blue-600 hover:bg-blue-700 text-sm text-white px-4 py-2 rounded-md flex items-center"
    onClick={() =>{
      setKeywords([]);
      setOpenAddForm(true);
    }
      }
    >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Add Product
        </button>
  </div>
  
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th> */}
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">

        {
          allProducts?.data?.map((product: any) => {

            return (
              <tr key={product?._id}>
              <td className="px-4 py-3 whitespace-nowrap">{product?.name}</td>
              <td className="px-4 py-3 truncate max-w-xs">{product?.description}</td>
              <td className="px-4 py-3">
                <div className="flex space-x-2">
                  <button className="p-1 text-blue-600 hover:text-blue-800 transition" aria-label="Edit product"
                    onClick={() => {
                      setCurrentProduct(product)
                      setKeywords(product?.keywords)
                      setOpenEditForm(true)
                    }
                    }
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button className="p-1 text-red-600 hover:text-red-800 transition" aria-label="Delete product"
                  onClick={() => setShowAlert(true)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round"  strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            )
          })
        }
      
       
      </tbody>
    </table>
  </div>
</div>
</div>

    </div>
    </>
  )
}

export default page