import React, {useState} from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
type Props = {}

const DialogBox = ({open,setOpen, product}: any) => {
      const [imagePreview, setImagePreview] = useState<string | null>(null);
      const [videoPreview, setVideoPreview] = useState<string | null>(null);
      const [keywords, setKeywords] = useState<Array<String>>([]);

       const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0]
          if (!file) return
          const imageURL = URL.createObjectURL(file)
          setImagePreview(imageURL)
          const imageError = document.getElementById('image-error')
          if (imageError) imageError.classList.add('hidden')
        }
      
        const handleRemoveImage = () => {
          setImagePreview(null)
          const imageInput = document.getElementById('product-image') as HTMLInputElement
          if (imageInput) imageInput.value = ''
        }
      
        const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0]
          if (!file) return
          const videoURL = URL.createObjectURL(file)
          setVideoPreview(videoURL)
          const videoError = document.getElementById('video-error')
          if (videoError) videoError.classList.add('hidden')
        }
      
        const handleRemoveVideo = () => {
          setVideoPreview(null)
          const videoInput = document.getElementById('product-video') as HTMLInputElement
          if (videoInput) videoInput.value = ''
        }

        const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const value = (e.target as HTMLInputElement).value.trim();
            if (value && !keywords.includes(value)) {
              setKeywords([...keywords, value]);
            }
            (e.target as HTMLInputElement).value = '';
          }
        };
        
        const handleRemoveKeyword = (tagToRemove: string) => {
          setKeywords(keywords.filter(tag => tag !== tagToRemove));
        };
      
  return (
   <>
       <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-transparent text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-full data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
           
           <div id="root">
        <section id="add-product" className="py-8 px-4 md:px-8 mt-14">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-neutral-800">{product ? "Edit Product" : "Add New Product"}</h2>
              <p className="text-gray-500 mt-1">
                Fill out the form below to {product ? "update product details" : "add a product"}.
              </p>
            </div>

            <form id="product-form" className="space-y-6">
              {/* Product Name */}
              <div>
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name *
                </label>
                <input
                  type="text"
                  id="product-name"
                  name="name"
                  defaultValue={product?.name || ""}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  placeholder="Enter product name"
                />
              </div>

              {/* Product Description */}
              <div>
                <label
                  htmlFor="product-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description *
                </label>
                <textarea
                  id="product-description"
                  defaultValue={product?.description || ""}
                  name="description"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  placeholder="Enter product description"
                />
              </div>

              {/* Product Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <div className="mt-1 flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer"
                      id="image-drop-area"
                    >
                      <input
                        type="file"
                        id="product-image"
                        name="image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <div className="space-y-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <div className="text-sm text-gray-600">
                          <label
                            htmlFor="product-image"
                            className="font-medium text-blue-600 hover:underline"
                          >
                            Click to upload
                          </label>
                          <span> or drag and drop</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                    <div
                      className="mt-1 text-xs text-red-500 hidden"
                      id="image-error"
                    >
                      Please upload a valid image.
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <div
                      className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden"
                      id="image-preview-container"
                    >
                      {/* Image Placeholder */}
                      <div
                        className="flex items-center justify-center h-full"
                        id="image-placeholder"
                        style={{
                          display: imagePreview ? 'none' : 'flex',
                        }}
                      >
                        <span className="text-sm text-gray-500">
                          Image preview will appear here
                        </span>
                      </div>
                      {/* Image Preview */}
                      <img
                        id="image-preview"
                        src={imagePreview || undefined}
                        alt="Preview"
                        className={`w-full h-full object-cover ${
                          imagePreview ? 'block' : 'hidden'
                        }`}
                      />
                      {/* Remove Image Button */}
                      <button
                        type="button"
                        id="remove-image"
                        className={`absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm text-gray-600 hover:text-red-500 ${
                          imagePreview ? 'block' : 'hidden'
                        }`}
                        onClick={handleRemoveImage}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Video */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Video
                </label>
                <div className="mt-1 flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition cursor-pointer"
                      id="video-drop-area"
                    >
                      <input
                        type="file"
                        id="product-video"
                        name="video"
                        accept="video/*"
                        className="hidden"
                        onChange={handleVideoChange}
                      />
                      <div className="space-y-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        <div className="text-sm text-gray-600">
                          <label
                            htmlFor="product-video"
                            className="font-medium text-blue-600 hover:underline"
                          >
                            Click to upload
                          </label>
                          <span> or drag and drop</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          MP4, WebM, Ogg up to 10MB
                        </p>
                      </div>
                    </div>
                    <div
                      className="mt-1 text-xs text-red-500 hidden"
                      id="video-error"
                    >
                      Please upload a valid video.
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center">
                    <div
                      className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden"
                      id="video-preview-container"
                    >
                      {/* Video Placeholder */}
                      <div
                        className="flex items-center justify-center h-full"
                        id="video-placeholder"
                        style={{
                          display: videoPreview ? 'none' : 'flex',
                        }}
                      >
                        <span className="text-sm text-gray-500">
                          Video preview will appear here
                        </span>
                      </div>
                      {/* Video Preview */}
                      <video
                        id="video-preview"
                        controls
                        className={`w-full h-full object-cover ${
                          videoPreview ? 'block' : 'hidden'
                        }`}
                      >
                        {videoPreview && (
                          <source src={videoPreview} type="video/mp4" />
                        )}
                        Your browser does not support the video tag.
                      </video>
                      {/* Remove Video Button */}
                      <button
                        type="button"
                        id="remove-video"
                        className={`absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm text-gray-600 hover:text-red-500 ${
                          videoPreview ? 'block' : 'hidden'
                        }`}
                        onClick={handleRemoveVideo}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keywords  */}
              <div>
                <label
                  htmlFor="product-tags"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Keywords
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="product-tags-input"
                    name="keywords"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    placeholder="Add tags (press Enter after each tag)"
                    onKeyDown={handleAddKeyword}
                  />
                </div>

                <div className="mt-2" id="tags-container">
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((tag: any) => (
                      <div
                        key={tag}
                        className="tag inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                        <button
                          type="button"
                          className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                          onClick={() => handleRemoveKeyword(tag)}
                        >
                          <svg
                            className="h-3 w-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <input type="hidden" id="product-tags" name="product-tags" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  id="cancel-btn"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-btn"
                  className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {product ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
   </>
  )
}

export default DialogBox