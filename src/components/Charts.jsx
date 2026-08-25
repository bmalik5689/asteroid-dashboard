import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

function Charts() {
  const [asteroids, setAsteroids] = useState([]);
  const date = new Date().toISOString().split("T")[0];

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
  }, []);

  const hazardData = [
    {
      name: "Hazardous",
      value: asteroids.filter((a) => a.is_potentially_hazardous_asteroid)
        .length,
    },
    {
      name: "Non-Hazardous",
      value: asteroids.filter((a) => !a.is_potentially_hazardous_asteroid)
        .length,
    },
  ];

  const diameterData = asteroids.slice(0, 8).map((a) => ({
    name: a.name,
    diameter: a.estimated_diameter.kilometers.estimated_diameter_max,
  }));

  const COLORS = ["#ff6b6b", "#1dd1a1"];

  return (
    <div>
      <h2>Asteroid Hazard Breakdown</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={hazardData} dataKey="value" label>
            {hazardData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <h2>Top Asteroid Diameters</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={diameterData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="diameter" fill="#66fcf1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;
