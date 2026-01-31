import React from "react";
import "@/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantLanding from "@/pages/RestaurantLanding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RestaurantLanding />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
