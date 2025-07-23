import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import DetailView from "./components/Detailview.jsx";
import "./index.css";
import Sidebar from "./components/Sidebar.jsx";
import Charts from "./components/Charts.jsx";
import About from "./components/About.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route index element={<App />} />
          <Route path="asteroid/:id" element={<DetailView />} />
          <Route path="charts" element={<Charts />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
