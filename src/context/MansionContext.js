import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MansionContext = createContext();

export const MansionProvider = ({ children }) => {
  const [mansions, setMansions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMansions = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/properties");
      console.log("Fetched mansions:", res.data);
      setMansions(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMansions();
  }, []);

  return (
    <MansionContext.Provider value={{ mansions, loading, error, fetchMansions }}>
      {children}
    </MansionContext.Provider>
  );
};

export const useMansions = () => useContext(MansionContext);
