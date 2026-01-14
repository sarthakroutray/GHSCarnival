import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  //Authentication check
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/login', { replace: true });
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    checkUser();
  }, [navigate]);

  // logout - session check
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  
  if (loading) return null; 

  return (
    <div className="admin-dashboard-container">
      {
        /* design */
      }
      
      <header>
        <h1> {user?.email?.split('@')[0]} active </h1> 
        <button onClick={handleLogout}
        className="px-5 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-500 border border-red-500/20 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200 active:scale-95">
        Logout
        </button>
      </header>

      <main>
        {/* dashboard content */ }
        <p> Login Active. Waiting on Dashboard ui </p>
      </main>
    </div>
  );
}
