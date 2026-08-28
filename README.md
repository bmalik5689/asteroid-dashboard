# 🚀 Asteroid Tracker Dashboard

A data visualization dashboard that pulls real-time data from NASA's Near-Earth Object API, letting users explore asteroids passing close to Earth — filterable by name and speed, with hazard-level breakdowns and diameter comparisons.
🔗 Live site: https://asteroid-dashboard-five.vercel.app 📂 Repo: https://github.com/bmalik5689/asteroid-dashboard.git

## Features

- **Live NASA data** — fetches near-Earth object data for any selected date via NASA's NEO API
- **Filtering** — search by asteroid name, filter by minimum approach speed
- **Detail views** — each asteroid has its own URL (`/asteroid/:id`) with expanded orbital data
- **Data visualization** — hazard breakdown (pie chart) and top asteroid diameters (bar chart), built with Recharts
- **Loading and error states** — clear feedback while data is fetching or if the API request fails

## Tech Stack

- React + Vite
- React Router
- Recharts
- NASA NEO (Near-Earth Object) API

## Running Locally

1. Clone the repo

   git clone https://github.com/bmalik5689/asteroid-dashboard.git
   cd asteroid-dashboard

2. Install dependencies

   npm install

3. Get a free NASA API key at api.nasa.gov and create a `.env` file in the project root:

   VITE_APP_API_KEY=your_key_here

4. Run the dev server

   npm run dev
