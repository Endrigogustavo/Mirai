import { ThemeProvider } from "./src/context/ThemeContext";
import {Routes} from "./src/routes/Routes";

export default function App() {
  return (
    <ThemeProvider>
        <Routes />
    </ThemeProvider>
  );
}
