import React from "react";
import { ThemeProvider } from "./src/context/themeContext";
import {Routes} from "./src/routes/Routes";

export default function App() {
  return (
    <ThemeProvider>
        <Routes />
    </ThemeProvider>
  );
}
