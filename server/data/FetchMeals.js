import { useState, useEffect } from 'react';

function FetchMeals() {
    const [availableMeals, setAvailableMeals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://mocki.io/v1/f46f86b3-cec0-4f37-b76d-59c3adf70d33');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setAvailableMeals(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { availableMeals, loading, error };
}

export default FetchMeals;

