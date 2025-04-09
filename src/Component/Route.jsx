import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import Dashboard from "./Dashboard";
import Loader from "./Loader";

const DashboardRedirect = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <Loader />;

 
  return user ? <Dashboard /> : <Navigate to="/login" />;
};

export default DashboardRedirect;
