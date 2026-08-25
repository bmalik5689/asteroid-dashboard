import { useEffect, useState } from "react";

/**
 * Fetches near-Earth objects from NASA's NEO API for a given date
 * includes the fetch, loading, and error state so components can use them
 */

export function useAsteroids(date) {
  const [asteroids, setAsteroids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchAsteroids() {
      setIsLoading(true);
      setError(null);

      try {
        const apiKey = import.meta.env.VITE_APP_API_KEY;
        const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`NASA API request failed (${response.status})`);
        }

        const data = await response.json();
        const allAsteroids = Object.values(data.near_earth_objects).flat();

        if (!isCancelled) {
          setAsteroids(allAsteroids);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || "Failed to fetch asteroid data");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchAsteroids();

    return () => {
      isCancelled = true;
    };
  }, [date]);

  return { asteroids, isLoading, error };
}
