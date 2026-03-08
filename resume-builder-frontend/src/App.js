import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Save preference whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route
            path="/builder"
            element={
              <Builder
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
