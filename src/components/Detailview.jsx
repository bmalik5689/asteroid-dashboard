import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function DetailView() {
  const { id } = useParams();
  const [asteroid, setAsteroid] = useState(null);

  useEffect(() => {
    async function fetchAsteroid() {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setAsteroid(data);
    }

    fetchAsteroid();
  }, [id]);

  if (!asteroid) return <p>Loading asteroid details...</p>;

  const {
    name,
    is_potentially_hazardous_asteroid,
    absolute_magnitude_h,
    estimated_diameter,
    orbital_data,
  } = asteroid;

  const diameter = estimated_diameter.kilometers.estimated_diameter_max;

  return (
    <div>
      <Link to="/">← Back to Dashboard</Link>
      <h2>{name}</h2>
      <p>
        <strong>Hazardous:</strong>{" "}
        {is_potentially_hazardous_asteroid ? "Yes ⚠️" : "No ✅"}
      </p>
      <p>
        <strong>Absolute Magnitude:</strong> {absolute_magnitude_h}
      </p>
      <p>
        <strong>Estimated Diameter:</strong> {parseFloat(diameter).toFixed(2)}{" "}
        km
      </p>
      <p>
        <strong>Orbit ID:</strong> {orbital_data.orbit_id}
      </p>
      <p>
        <strong>Orbiting Body:</strong>{" "}
        {orbital_data.orbit_class?.orbit_class_description}
      </p>
    </div>
  );
}

export default DetailView;
