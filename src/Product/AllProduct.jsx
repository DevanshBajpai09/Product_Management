import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardNavbar from '@/Component/DashboardNavbar';
import { deleteProduct, supabase } from '@/utils/supabaseClient';
import { FiPackage, FiEdit2, FiEye, FiPlus, FiRefreshCw, FiStar, FiFilter, FiTrash2 } from 'react-icons/fi';
import Loader from '@/Component/Loader';

const AllProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [needsRefresh, setNeedsRefresh] = useState(false);


  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);


  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error(authError?.message);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (products.length === 0) return;

    let results = [...products];


    if (categoryFilter !== 'all') {
      results = results.filter(product => product.category === categoryFilter);
    }


    results = results.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );


    if (minRating > 0) {
      results = results.filter(product => product.rating >= minRating);
    }

    setFilteredProducts(results);
  }, [categoryFilter, priceRange, minRating, products]);


  useEffect(() => {
    fetchProducts();
  }, [needsRefresh]);


  const categories = ['all', ...new Set(products.map(p => p.category))];

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleAddProduct = () => {
    navigate('/create-product');
  };

  const refreshProductList = () => {
    setNeedsRefresh(!needsRefresh);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar />
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <FiPackage className="text-blue-500 text-2xl" />
            <h1 className="text-2xl font-bold text-gray-800">
              My Product Catalog
            </h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <FiFilter />
              Filters
            </button>
            <button
              onClick={refreshProductList}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <FiRefreshCw className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FiPlus />
              Add Product
            </button>
          </div>
        </div>


        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Rating: {minRating}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span>{minRating}+</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}


        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
            <FiPackage className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              {products.length === 0 ? 'Your Catalog is Empty' : 'No Matching Products'}
            </h3>
            <p className="text-gray-500 mb-6">
              {products.length === 0
                ? 'Get started by adding your first product'
                : 'Try adjusting your filters'}
            </p>
            <button
              onClick={handleAddProduct}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-bold text-gray-800">
                      ₹{product.price}
                    </span>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                      <span className="text-yellow-600 font-medium mr-1">
                        {product.rating}
                      </span>
                      <FiStar className="text-yellow-400" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewDetails(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm"
                    >
                      <FiEye />
                      View
                    </button>
                    <button
                      onClick={() => handleEditProduct(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm"
                    >
                      <FiEdit2 />
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        await deleteProduct(product.id);
                        refreshProductList();
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProduct;