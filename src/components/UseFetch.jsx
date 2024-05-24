import { useState, useEffect } from 'react'

const UseFetch = (url) => {
    const [currency, setCurrency] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchCurrency = async () =>{
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network Response was not ok ');
            }
            const data = await response.json();
            setCurrency(data);
        } catch (error) {
            setError(error);
        }
        finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchCurrency()
    }, [url]);

  return { currency, loading, error };
}

export default UseFetch ;