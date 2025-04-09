import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardNavbar from "@/Component/DashboardNavbar";
import { editProduct, getProductDetails } from "@/utils/supabaseClient";
import { useParams } from "react-router-dom";
import { FiPackage, FiEdit2, FiDollarSign, FiStar, FiTag } from "react-icons/fi";

const EditProductForm = () => {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    rating: "",
  });
  const [isSaving, setSavingStatus] = useState(false);

  useEffect(() => {
    const loadProductData = async () => {
      try {
        const product = await getProductDetails(id);
        if (product) {
          setProductInfo({
            name: product.name || "",
            description: product.description || "",
            category: product.category || "",
            price: product.price || "",
            rating: product.rating || "",
          });
        }
      } catch (error) {
        console.error("error loading", error.message);
      }
    };

    loadProductData();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSavingStatus(true);

    try {
      await editProduct(
        id,
        productInfo.name,
        productInfo.description,
        productInfo.category,
        parseFloat(productInfo.price),
        parseFloat(productInfo.rating)
      )
      
    } catch (error) {
      console.error("Failed", error.message);
    } finally {
      setSavingStatus(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProductInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiEdit2 className="text-blue-600 text-xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Update Product Details
              </h1>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
             
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <FiPackage className="text-blue-500" />
                  Product Name
                </label>
                <input
                  type="text"
                  value={productInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>

              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <FiEdit2 className="text-blue-500" />
                  Description
                </label>
                <textarea
                  rows={4}
                  value={productInfo.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your product..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>

             
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <FiTag className="text-blue-500" />
                  Category
                </label>
                <input
                  type="text"
                  value={productInfo.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  placeholder="e.g. Electronics, Clothing"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <FiDollarSign className="text-blue-500" />
                    Price (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">₹</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={productInfo.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <FiStar className="text-blue-500" />
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={productInfo.rating}
                    onChange={(e) => handleInputChange("rating", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              
              <button
                type="submit"
                disabled={isSaving}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                  isSaving ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSaving ? 'Saving Changes...' : 'Update Product'}
              </button>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default EditProductForm;