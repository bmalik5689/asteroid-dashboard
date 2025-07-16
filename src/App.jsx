import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("2025-07-15");
  const [minSliderSpeed, setMinSliderSpeed] = useState(0);

  useEffect(() => {
    async function fetchAsteroids() {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      const allAsteroids = Object.values(data.near_earth_objects).flat();
      setAsteroids(allAsteroids);
    }

    fetchAsteroids();
  }, [date]);

  const filtered = asteroids
    .filter((asteroid) =>
      asteroid.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((asteroid) => {
      const speed = parseFloat(
        asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
      );
      return !minSliderSpeed || speed >= minSliderSpeed;
    });

  const total = filtered.length;

  const hazardousCount = filtered.filter(
    (a) => a.is_potentially_hazardous_asteroid
  ).length;

  const largest = filtered.length
    ? Math.max(
        ...filtered.map(
          (a) => a.estimated_diameter.kilometers.estimated_diameter_max
        )
      ).toFixed(2)
    : "N/A";
  return (
    <div>
      <h1>Asteroids Near Earth</h1>
      <div className="stats">
        <p>Total Asteroids: {total}</p>
        <p>Hazardous Asteroids: {hazardousCount}</p>
        <p>Largest Diameter: {largest} km</p>
      </div>

      <label>
        Pick a date:{" "}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <br />

      <label>
        Search by name:{" "}
        <input
          type="text"
          placeholder="e.g. Apollo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <label>
        Min Speed (km/h):{" "}
        <input
          type="range"
          min="0"
          max="100000"
          step="100"
          value={minSliderSpeed}
          onChange={(e) => setMinSliderSpeed(e.target.value)}
        />
        <span> {minSliderSpeed} km/h</span>
      </label>

      <hr />

      {filtered.map((asteroid, index) => {
        const speed =
          asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour;
        const diameter =
          asteroid.estimated_diameter.kilometers.estimated_diameter_max;

        return (
          <div key={index} className="asteroid-card">
            <h3>{asteroid.name}</h3>
            <p>
              Approach Date:{" "}
              {asteroid.close_approach_data[0].close_approach_date}
            </p>
            <p>Speed: {parseFloat(speed).toFixed(2)} km/h</p>
            <p>Diameter: {parseFloat(diameter).toFixed(2)} km</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
