import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardNavbar from "./DashboardNavbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { 
  MdOutlineMail, 
  MdTimelapse, 
  MdOutlineVerified,
  MdLocationPin,
  MdPerson 
} from "react-icons/md";


import { supabase } from "@/utils/supabaseClient";
import Loader from "./Loader";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    joined: new Date().toISOString(),
    
  });
  const [loading, setLoading] = useState(true);
  const [location] = useState({ lat: 28.6139, lng: 77.209 });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data: userSession, error: sessionError } = await supabase.auth.getUser();
        
        if (sessionError || !userSession?.user) {
          throw sessionError || new Error("No session found");
        }

        const userId = userSession.user.id;
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

        if (userError || !userData) {
          throw userError || new Error("not found");
        }

        console.log("User fetch", userData);

        setUser({
          ...userData,
          joined: userData.joined || new Date().toISOString()
        });
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader/>
      </div>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen text-gray-800">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-10" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Welcome back, <span className="text-blue-600">{user.username || 'User'}</span>! 👋
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Here's everything you need to manage your account. You can update your 
                information, check your status, and explore your location data.
              </p>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="mt-6 inline-block"
              >
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                  Explore Features
                </button>
              </motion.div>
            </div>
          </motion.div>

         
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 col-span-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-full">
                  <MdPerson className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
              </div>
              
              <div className="space-y-5">

              <div className="flex items-start gap-4">
                  <MdOutlineMail className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">User Name</p>
                    <p className="text-gray-700 font-medium">{user.username || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MdOutlineMail className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="text-gray-700 font-medium">{user.email || 'Not provided'}</p>
                  </div>
                </div>
                
                
                
                <div className="flex items-start gap-4">
                  <MdTimelapse className="text-yellow-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-gray-700 font-medium">
                      {new Date(user.joined).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                
                
              </div>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden col-span-1 lg:col-span-2"
            >
              <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                <MdLocationPin className="text-red-500" size={22} />
                <h3 className="text-xl font-semibold text-gray-800">Your Location</h3>
              </div>
              
              <div className="h-80 md:h-96 w-full">
                <MapContainer
                  center={[location.lat, location.lng]}
                  zoom={12}
                  style={{ height: "100%", width: "100%" }}
                  className="z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[location.lat, location.lng]}>
                    <Popup>
                      <div className="text-center">
                        <p className="font-semibold">{user.name}'s Location</p>
                        <p className="text-sm text-gray-600">Approximate area</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              
              <div className="p-4 bg-gray-50 text-sm text-gray-600">
                <p>Location data is approximate and used for service optimization.</p>
              </div>
            </motion.div>
          </div>

          
         
        </div>
      </div>
    </>
  );
};

export default Dashboard;