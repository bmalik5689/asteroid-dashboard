# 🚀 Asteroid Tracker Dashboard

A data visualization dashboard that pulls live data from NASA's Near-Earth Object API, letting users explore asteroids passing close to Earth on any given day, filterable by name and speed, with hazard-level breakdowns and diameter comparisons.

**[Live Demo](https://asteroid-dashboard-five.vercel.app)**

## Features

- **Live NASA data** — fetches near-Earth asteroid data for any selected date via NASA's NeoWs API
- **Filtering** — search by asteroid name, filter by minimum approach speed
- **Per-asteroid detail** — hazard status, distance from Earth, speed, and diameter on every card, plus a dedicated detail view at its own URL
- **Closest approach spotlight** — surfaces the single closest asteroid for the selected date
- **Data visualization** — hazard breakdown (pie chart) and top asteroid diameters (bar chart), built with Recharts
- **Loading and error states** — clear feedback while data is fetching or if the API request fails
- **In-app explainer** — an About page that explains what "potentially hazardous" and "distance" actually mean, since NASA's own terminology can be confusing at first glance

## Tech Stack

- React + Vite
- React Router
- Recharts
- NASA NeoWs (Near-Earth Object Web Service) API

## Running Locally

1. Clone the repo

   git clone https://github.com/bmalik5689/asteroid-dashboard.git
   cd asteroid-dashboard

2. Install dependencies

   npm install

3. Get a free NASA API key at [api.nasa.gov](https://api.nasa.gov) and create a `.env` file in the project root:

   VITE_APP_API_KEY=your_key_here

4. Run the dev server

   npm run dev

## Notes

NASA's NeoWs feed only returns asteroids making a close approach on the selected date, not every known near-Earth object. For a full real-time view of all tracked asteroids and comets, see NASA's own [Eyes on Asteroids](https://eyes.nasa.gov/apps/asteroids/).
