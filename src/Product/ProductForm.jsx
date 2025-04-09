import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import DashboardNavbar from '@/Component/DashboardNavbar';
import { FiPackage, FiDollarSign, FiStar, FiTag, FiUpload, FiImage } from 'react-icons/fi';
import { CreateProfile } from '@/utils/supabaseClient';

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    rating: '',
    imageFile: null
  });
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct(prev => ({ ...prev, imageFile: file }));
      
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await CreateProfile(
        product.name,
        product.description,
        product.category,
        product.price,
        product.rating,
        product.imageFile
      );
      
      console.log('Submitting:', product);
      
      setProduct({
        name: '',
        description: '',
        category: '',
        price: '',
        rating: '',
        imageFile: null
      });
      setPreview('');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <div className="max-w-md mx-auto p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
            <FiPackage className="text-blue-500" />
            Add New Product
          </h1>
          
        
          <div className="mb-6">
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              {preview ? (
                <div className="relative">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="mx-auto h-40 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreview('');
                      setProduct(prev => ({ ...prev, imageFile: null }));
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <FiImage className="text-3xl text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Click to upload product image
                  </p>
                  <span className="text-xs text-gray-400">
                    (JPEG, PNG, max 5MB)
                  </span>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium flex items-center gap-2">
                <FiPackage className="text-blue-500" />
                Product Name
              </label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Description
              </label>
              <textarea
                rows={3}
                value={product.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium flex items-center gap-2">
                <FiTag className="text-blue-500" />
                Category
              </label>
              <input
                type="text"
                value={product.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium flex items-center gap-2">
                  <FiDollarSign className="text-blue-500" />
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={product.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium flex items-center gap-2">
                  <FiStar className="text-blue-500" />
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={product.rating}
                  onChange={(e) => handleChange('rating', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 mt-6 rounded-lg font-medium text-white flex items-center justify-center gap-2 ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <FiUpload />
                  Add Product
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductForm;