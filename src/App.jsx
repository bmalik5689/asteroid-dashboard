import { useState } from "react";
import { useAsteroids } from "./hooks/useAsteroids";
import { Link } from "react-router-dom";
import "./App.css";
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

function App() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minSliderSpeed, setMinSliderSpeed] = useState(0);
  const { asteroids, isLoading, error } = useAsteroids(date);

  const filtered = asteroids
    .filter((asteroid) =>
      asteroid.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((asteroid) => {
      const speed = parseFloat(
        asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
      );
      return !minSliderSpeed || speed >= minSliderSpeed;
    });

  const hazardData = [
    {
      name: "Hazardous",
      value: filtered.filter((a) => a.is_potentially_hazardous_asteroid).length,
    },
    {
      name: "Non-Hazardous",
      value: filtered.filter((a) => !a.is_potentially_hazardous_asteroid)
        .length,
    },
  ];

  const diameterData = filtered.slice(0, 8).map((a) => ({
    name: a.name,
    diameter: parseFloat(
      a.estimated_diameter.kilometers.estimated_diameter_max,
    ),
  }));

  const COLORS = ["#ff6b6b", "#1dd1a1"];
  const total = filtered.length;
  const hazardousCount = hazardData[0].value;
  const largest = filtered.length
    ? Math.max(
        ...filtered.map(
          (a) => a.estimated_diameter.kilometers.estimated_diameter_max,
        ),
      ).toFixed(2)
    : "N/A";

  const closest = filtered.length
    ? filtered.reduce((min, a) => {
        const dist = parseFloat(
          a.close_approach_data[0].miss_distance.kilometers,
        );
        const minDist = parseFloat(
          min.close_approach_data[0].miss_distance.kilometers,
        );
        return dist < minDist ? a : min;
      })
    : null;

  if (isLoading) {
    return <p className="status-message">Loading asteroid data...</p>;
  }

  if (error) {
    return (
      <p className="status-message status-error">
        Couldn't load asteroid data: {error}
      </p>
    );
  }

  return (
    <div className="dashboard-flex">
      {/* Left Panel: Filters, Stats, and Asteroid Cards */}
      <div className="asteroid-list-panel">
        <h1>Asteroids Near Earth</h1>

        <div className="stats">
          <p>Total Asteroids: {total}</p>
          <p>Hazardous Asteroids: {hazardousCount}</p>
          <p>Largest Diameter: {largest} km</p>
          <p>
            Closest Approach: {closest ? closest.name : "N/A"}
            {closest &&
              `- ${Math.round(parseFloat(closest.close_approach_data[0].miss_distance.kilometers)).toLocaleString()} km away`}
          </p>
        </div>

        <label>
          Pick a date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

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

        {filtered.map((asteroid) => {
          const speed =
            asteroid.close_approach_data[0].relative_velocity
              .kilometers_per_hour;
          const diameter =
            asteroid.estimated_diameter.kilometers.estimated_diameter_max;
          const isHazardous = asteroid.is_potentially_hazardous_asteroid;
          const missDistanceKm =
            asteroid.close_approach_data[0].miss_distance.kilometers;
          return (
            <Link
              to={`/asteroid/${asteroid.id}`}
              key={asteroid.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="asteroid-card">
                <h3>{asteroid.name}</h3>
                <p className={isHazardous ? "hazard-yes" : "hazard-no"}>
                  {isHazardous ? "⚠️ Potentially Hazardous" : "Not Hazardous"}
                </p>
                <p>
                  Distance:{" "}
                  {Math.round(parseFloat(missDistanceKm)).toLocaleString()} km
                </p>
                <p>Speed: {parseFloat(speed).toFixed(2)} km/h</p>
                <p>Diameter: {parseFloat(diameter).toFixed(2)} km</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Right Panel: Chart Cards */}
      <div className="chart-panel">
        <div className="chart-block">
          <h2>Hazard Breakdown</h2>
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
        </div>

        <div className="chart-block">
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
      </div>
    </div>
  );
}

export default App;
