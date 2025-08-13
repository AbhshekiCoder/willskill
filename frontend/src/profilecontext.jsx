import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const url = import.meta.env.VITE_URL;

// Create context
export const ProfileContext = createContext(null);

// Provider component
export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user profile once when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const result = await axios.post(`${url}user_detail/user_detail`, {
          token,
        });
        if (result?.data?.name) {
          const firstName = result.data.name.split(" ")[0];
          setUser(firstName);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []); // empty dependency array = runs only once

  return (
    <ProfileContext.Provider value={user}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook for using the profile context
export const useProfile = () => {
  return useContext(ProfileContext);
};
