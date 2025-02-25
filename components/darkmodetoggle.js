"use client";
import { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Apply the theme to the document
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="dark-mode-toggle"
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;