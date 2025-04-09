import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import DashboardNavbar from '@/Component/DashboardNavbar';
import { supabase } from '@/utils/supabaseClient';
import Loader from '@/Component/Loader';
import { FiPackage, FiTag, FiDollarSign, FiStar, FiCalendar } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Product not found');

      setProduct(data);

     
      if (data.product_image) {
        const { data: imageData } = await supabase
          .storage
          .from('productimage')
          .getPublicUrl(data.product_image);
        
        setImageUrl(imageData?.publicUrl || '');
       

      }

    } catch (error) {
      console.error('Error loading product:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Couldn't find this product</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
        >
          
          {imageUrl && (
            <div className="h-64 bg-gray-100 overflow-hidden">
              <img 
                src={imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiPackage className="text-blue-600 text-xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {product.name}
                </h1>
                <p className="text-gray-500 mt-1">
                  {product.category || 'No category specified'}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Description
                </h3>
                <p className="text-gray-700">
                  {product.description || 'No description available'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FiDollarSign className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-lg font-semibold text-gray-800">
                      ₹{parseFloat(product.price).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FiStar className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rating</p>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-semibold text-gray-800">
                        {product.rating}
                      </span>
                      <FiStar className="text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FiCalendar className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Added on</p>
                  <p className="text-gray-700">
                    {new Date(product.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;