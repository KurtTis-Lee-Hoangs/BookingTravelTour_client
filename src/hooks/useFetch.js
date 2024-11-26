import { useState, useEffect } from "react";

const useFetch = (url, refreshKey) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url, {
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(res)
        // console.log(url)
        if (!res.ok) {
          setError("failed to fetch");
        }
        const result = await res.json();

        setData(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, refreshKey]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
