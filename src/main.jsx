import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { PrimeReactProvider } from "primereact/api"
import "primereact/resources/themes/lara-light-cyan/theme.css"; 
import "primereact/resources/primereact.min.css";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </BrowserRouter>
)
